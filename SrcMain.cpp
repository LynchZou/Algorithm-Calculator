#include "SrcMain.h"
#include <iostream>
#include <random>
#include "TSP.h"
#include <fstream>
#include <algorithm>


void ProcessCommandArgs(int argc, const char* argv[])
{
    std::string inputFile = argv[1];
    const int POPULATION_SIZE = 256;
    const int GENERATION = 200;
    const double MUTATION_CHANCE = 20;
    const int SEEDVALUE = 7410785;
    
    std::mt19937 mt_rand(SEEDVALUE);
    std::vector<Population*> populations;
    
    std::vector<Location*> locations = parseLocations(inputFile);
    Population* population = randomPopulations(locations, mt_rand, POPULATION_SIZE);
    populations.push_back(population);
    
    // write to file
    std::ofstream outfile("log.txt");
    std::ofstream out("path.txt");
    outfile << "INITIAL POPULATION:" << std::endl;
    std::for_each(population->mMembers.begin(), population->mMembers.end(), [&outfile](const std::vector<int>& v){
        std::for_each(v.begin(), v.end()-1, [&outfile](const int& i){
            outfile << i << ",";
        });
        outfile << v.back() << std::endl;
    });
    
    
    // loop x GENERATIONs
    for(int i = 0; i < GENERATION; i++)
    {
        population = populations.back();
        // calculate fitness and write to file
        outfile << "FITNESS:" << std::endl;
        std::vector<std::pair<int, double>> fitness = calculateFitness(locations, population);
        std::for_each(fitness.begin(), fitness.end(), [&outfile](const std::pair<int, double>& mypair){
            outfile << mypair.first << ":" << mypair.second << std::endl;
        });
        
        // pick parents and write to file
        outfile << "SELECTED PAIRS:" << std::endl;
        std::vector<std::pair<int, int>> parents = selection(fitness, POPULATION_SIZE, mt_rand);
        std::for_each(parents.begin(), parents.end(), [&outfile](const std::pair<int, int>& mypair){
            outfile << "(" << mypair.first << "," << mypair.second << ")" << std::endl;
        });
        
        // generate new GENERATION and write to file
        outfile << "GENERATION: " + std::to_string(i+1) << std::endl;
        std::vector<std::vector<int>> newPopulation = crossover(POPULATION_SIZE, mt_rand, parents, MUTATION_CHANCE, population);
        std::for_each(newPopulation.begin(), newPopulation.end(), [&outfile](const std::vector<int>& v){
            std::for_each(v.begin(), v.end()-1, [&outfile](const int& i){
                outfile << i << ",";
            });
            outfile << v.back() << std::endl;
        });
        
        Population* newPop = new Population();
        newPop->mMembers = newPopulation;
        populations.push_back(newPop);
    }
    
    // calculate fitness of last GENERATION and write to file
    outfile << "FITNESS:" << std::endl;
    std::vector<std::pair<int, double>> fitness = calculateFitness(locations, populations.back());
    std::for_each(fitness.begin(), fitness.end(), [&outfile](const std::pair<int, double>& mypair){
        outfile << mypair.first << ":" << mypair.second << std::endl;
    });
    
    
    // select the optimal path and write to file
    auto solution = std::min_element(fitness.begin(), fitness.end(),
                                         [](const std::pair<int, double>& a, const std::pair<int, double>& b)
    {
        return a.second < b.second;
    });
    std::for_each(populations.back()->mMembers[solution->first].begin(), populations.back()->mMembers[solution->first].end(), [&out, locations](const int& i){
        out << locations[i]->mName << "\t\t\t\t --> Only for reference --> " << "latitude: " << locations[i]->mLatitude/0.0174533 << "," << "longitude: " << locations[i]->mLongitude/0.0174533 << std::endl;
    });
    out << locations[0]->mName << "\t\t\t\t --> Only for reference --> " << "latitude: " << locations[0]->mLatitude/0.0174533 << "," << "longitude: " << locations[0]->mLongitude/0.0174533 << std::endl;
    out << "DISTANCE: " << solution->second <<  + " miles";
    
    outfile.close();
    out.close();
    
}





