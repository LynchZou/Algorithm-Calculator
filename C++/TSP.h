#pragma once
#include <string>
#include <vector>
#include <random>

struct Location
{
	std::string mName;
	double mLatitude;
	double mLongitude;
};

struct Population
{
	std::vector<std::vector<int>> mMembers;
};

std::vector<Location*> parseLocations(const std::string& inputFile);
Population* randomPopulations(const std::vector<Location*>& locations, std::mt19937& mt_rand,
                              const int& populationSize);
std::vector<std::pair<int, double>> calculateFitness(const std::vector<Location*>& locations, Population* population);
std::vector<std::pair<int, int>> selection(std::vector<std::pair<int, double>>& fitness,
                                           const int& populationSize, std::mt19937& mt_rand);
std::vector<std::pair<int, int>> pickHelper(int exeTime, const std::vector<double>& probability, std::mt19937& mt_rand);
std::vector<std::vector<int>> crossover(const int& populationSize, std::mt19937& mt_rand,
                                        const std::vector<std::pair<int, int>>& parents,
                                        const double& mutationChance, Population* population);
