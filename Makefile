CXX = g++
CPPFLAGS = -g -Wall -std=c++11

all: Main

Main: Main.cpp SrcMain.o TSP.o
	$(CXX) $(CPPFLAGS) $^ -o $@

TSP.o: TSP.cpp TSP.h
	$(CXX) $(CPPFLAGS) -c $< -o $@

SrcMain.o: SrcMain.cpp SrcMain.h
	$(CXX) $(CPPFLAGS) -c $< -o $@