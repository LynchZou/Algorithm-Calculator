CXX = g++
CPPFLAGS = -g -Wall -std=c++11
BIN_DIR = bin

all: Main

Main: Main.cpp SrcMain.o TSP.o
	$(CXX) $(CPPFLAGS) $^ -o $@

TSP.o: TSP.cpp TSP.h
	$(CXX) $(CPPFLAGS) -c $< -o $@

SrcMain.o: SrcMain.cpp SrcMain.h
	$(CXX) $(CPPFLAGS) -c $< -o $@

.PHONY: clean
clean:
	rm -rf $(BIN_DIR)
	rm hw4

$(BIN_DIR)/.dirstamp:
	mkdir -p $(BIN_DIR)
	touch $(BIN_DIR)/.dirstamp