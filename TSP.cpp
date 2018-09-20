#include "TSP.h"
#include <fstream>
#include <algorithm>
#include <cmath>
#include <iterator>
#include <numeric>
#include <cstdlib>
#include <utility>
#include <functional>
#include <iostream>
#include <iomanip>


// function for parsing the locations
std::vector<Location*> parseLocations(const std::string& inputFile)
{   
    std::vector<Location*> locations;
    std::ifstream infile(inputFile);
    
    std::string line;
    while(std::getline(infile, line))
    {
        Location* loc = new Location();
        // obtain location
        int index = line.find_first_of(',');
        loc->mName = (line.substr(0, index));
        // obtain latitude and longitude
        int index2 = line.find_last_of(',');
        std::string latitude = line.substr(index+1,index2-index-1);
        std::string longitude = line.substr(index2+1, line.length());
        
        loc->mLatitude = std::stod(latitude)*0.0174533;
        loc->mLongitude = std::stod(longitude)*0.0174533;
        
        locations.push_back(loc);
    }
    
    return locations;
}

// function for generating random numbers
Population* randomPopulations(const std::vector<Location*>& locations, std::mt19937& mt_rand,
                       const int& populationSize)
{
    Population* population = new Population();
    std::vector<int> sequential(locations.size());
    std::iota(sequential.begin(), sequential.end(), 0);
    
    for(int i = 0; i < populationSize; i++)
    {
        std::shuffle(sequential.begin()+1, sequential.end(), mt_rand);
        population->mMembers.push_back(sequential);
        // reset sequential
        std::iota(sequential.begin(), sequential.end(), 0);
    }
    
    return population;
}

// function to calculate fitness
std::vector<std::pair<int, double>> calculateFitness(const std::vector<Location*>& locations, Population* population)
{
    std::vector<std::pair<int, double>> fitness;
    
    int count = 0;
    std::for_each(population->mMembers.begin(), population->mMembers.end(), [&locations, &count, &fitness](const std::vector<int>& v){
        std::vector<double> temp;
        // calculate distance difference
        std::vector<double> doubleVec(v.begin(), v.end());
        
        std::adjacent_difference(doubleVec.begin(), doubleVec.end(), std::back_inserter(temp),
                                 [&locations](const double& a, const double& b)
        {
            double dlon = locations[b]->mLongitude - locations[a]->mLongitude;
            double dlat = locations[b]->mLatitude - locations[a]->mLatitude;
            double x = pow(sin(dlat/2.0),2.0) +
            cos(locations[a]->mLatitude)*cos(locations[b]->mLatitude)*pow(sin(dlon/2.0), 2.0);
            double y = 2.0*atan2(sqrt(x), sqrt(1.0-x));
            return 3961.0*y;
        });
        
        
        // sum up all the difference
        double fit = std::accumulate(temp.begin()+1, temp.end(), 0.0, [](const double& a,
                                                                         const double& b)
        {
            return a+b;
        });
        
        // calculate distance between first and last location
        double dlon = locations[v[0]]->mLongitude - locations[v[v.size()-1]]->mLongitude;
        double dlat = locations[v[0]]->mLatitude - locations[v[v.size()-1]]->mLatitude;
        double x = pow(sin(dlat/2.0),2.0) + cos(locations[v[0]]->mLatitude)*cos(locations[v[v.size()-1]]->mLatitude)*pow(sin(dlon/2.0), 2.0);
        fit += 2.0*atan2(sqrt(x), sqrt(1.0-x))*3961.0;
        
        // push the result
        fitness.emplace_back(std::make_pair(count, fit));
        count++;
    });
    
    return fitness;
}

// function for selection
std::vector<std::pair<int, int>> selection(std::vector<std::pair<int, double>>& fitness, const int& populationSize, std::mt19937& mt_rand){
    
    // sort
    std::sort(fitness.begin(), fitness.end(), [](const std::pair<int, double>& a, const std::pair<int, double>& b){
        return a.second < b.second;
    });
    
    // construct probability
    std::vector<double> probability(populationSize, 1.0/populationSize);
    probability[fitness[0].first] *= 6;
    probability[fitness[1].first] *= 6;
    std::for_each(fitness.begin()+2, fitness.begin()+populationSize/2, [&probability](const std::pair<double, double>& x){
        probability[x.first] *= 3;
    });
    
    // renormalize probability
    double probabilitySum = std::accumulate(probability.begin(), probability.end(), 0.0);
    std::transform(probability.begin(), probability.end(), probability.begin(),[probabilitySum](double x){
        return x/probabilitySum;
    });
    
    int exeTime = populationSize;
    
    return pickHelper(exeTime, probability, mt_rand);
}



// helper function for picking parents
std::vector<std::pair<int, int>> pickHelper(int exeTime, const std::vector<double>& probability, std::mt19937& mt_rand)
{
    // base case
    if(exeTime == 0){
        std::vector<std::pair<int, int>> parents;
        return parents;
    }
    
    // recursive call
    std::vector<std::pair<int, int>> parents = pickHelper(exeTime-1, probability, mt_rand);
    // pick the first parent
    std::uniform_real_distribution<double> dis1(0.0, 1.0);
    double threshold1 = dis1(mt_rand);
    double sum1 = 0.0;
    int parent1 = 0, index = 0;
    bool stopFlag = false;
    std::for_each(probability.begin(), probability.end(), [threshold1, &parent1, &sum1, &index, &stopFlag](double x){
        if(!stopFlag){
            sum1 += x;
            if(sum1 >= threshold1){
                parent1 = index;
                stopFlag = true;
            }
        }
        index++;
    });
    // pick the first parent
    std::uniform_real_distribution<double> dis2(0.0, 1.0);
    double threshold2 = dis2(mt_rand);
    double sum2 = 0.0;
    int parent2 = 0, index2 = 0;
    bool stopFlag2 = false;
    std::for_each(probability.begin(), probability.end(), [threshold2, &parent2, &sum2, &index2, &stopFlag2](double x){
        if(!stopFlag2){
            sum2 += x;
            if(sum2 >= threshold2){
                parent2 = index2;
                stopFlag2 = true;
            }
        }
        index2++;
    });
    
    parents.emplace_back(std::make_pair(parent1, parent2));
    
    return parents;
    
}

// function for crossover
std::vector<std::vector<int>> crossover(const int& populationSize, std::mt19937& mt_rand,
                                        const std::vector<std::pair<int, int>>& parents,
                                        const double& mutationChance, Population* population)
{
    
    // initialize new population
    std::vector<std::vector<int>> newPopulation;
    
    std::for_each(parents.begin(), parents.end(), [&newPopulation, &mt_rand, mutationChance, population]
                  (const std::pair<int, int>& mypair)
    {
        std::vector<int> onePopulation;
          
        // generate crossover index
        std::uniform_int_distribution<int> distribution(1, population->mMembers[0].size()-2);
        int crossoverIndex = distribution(mt_rand);
        // determine which parent goes first
        std::uniform_int_distribution<int> distribution2(0, 1);
        int firstParent = distribution2(mt_rand);
          
        // parent A goes first
        if(firstParent){
            std::copy(population->mMembers[mypair.first].begin(), population->mMembers[mypair.first].begin()+crossoverIndex+1, std::back_inserter(onePopulation));
            std::for_each(population->mMembers[mypair.second].begin(), population->mMembers[mypair.second].end(),[&onePopulation](const int& i){
                auto it = std::find(onePopulation.begin(), onePopulation.end(), i);
                if(it == onePopulation.end()) onePopulation.push_back(i);
            });
        }
        else{
            std::copy(population->mMembers[mypair.second].begin(), population->mMembers[mypair.second].begin()+crossoverIndex+1, std::back_inserter(onePopulation));
            std::for_each(population->mMembers[mypair.first].begin(), population->mMembers[mypair.first].end(),[&onePopulation](const int& i){
                auto it = std::find(onePopulation.begin(), onePopulation.end(), i);
                if(it == onePopulation.end()) onePopulation.push_back(i);
            });
        }
        
        // mutation
        std::uniform_real_distribution<double> dis(0.0, 1.0);
        if(dis(mt_rand) <= mutationChance/100){
            std::uniform_int_distribution<int> dis2(1, population->mMembers[0].size()-1);
            int firstIndex = dis2(mt_rand);
            int secondIndex = dis2(mt_rand);
            std::swap(onePopulation[firstIndex], onePopulation[secondIndex]);
        }
          
        newPopulation.push_back(onePopulation);
          
    });

    
    return newPopulation;
    
}

