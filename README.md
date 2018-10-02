# Optimal Solution to Travelling Salesperson by Genetic Algorithm
## Xuyang Zou (Lynch)

<br><br><br>


## Table of Contents

1. introduction
    1. Purpose
    2. Architecture
    3. Functionality
    4. Test Result  
    <br>
2. Design Instruction
    1. Build General Layout
    2. Build Web Interface
    3. Build Dynamic Contents
    4. Build Genetic Algorithm Section
    <br>
3. Specific Case Warning
    1. C++ Compiler
    2. Discontinuity of Web Interface and Calculation
    <br>
4. Test
    1. Test Environment
    2. Web Interface Test
    3. Locations Test

<br><br><br>


# 1. Introduction

## Purpose
1. This project is for the purpose of solving `Traverlling Salesperson Problem` with Genetiv Algorithm
2. Besides entering predetermined inputs, it will ask for inputs from the user, process the inputs and print the final path on `Google Map`, meaning that it indeed solves real problems
<br>

## Architecture
1. The static web interface is designed and implemented with BootStrap 4 in order to obtain responsive design and pretty-looking color schemes as well as layout
    1. Documentation of BootStrap 4: [http://getbootstrap.com/docs/4.1/getting-started/introduction/](http://getbootstrap.com/docs/4.1/getting-started/introduction/)
    2. Free template used -- `Grayscale` (can be used for commercial purpose): [https://startbootstrap.com/template-overviews/grayscale/](https://startbootstrap.com/template-overviews/grayscale/)
    3. URL of web interface: [http://lynch0114.com](http://lynch0114.com)
    4. The web interface is structured with the following features
        - Basic Introduction
        - Google Map API
        - Button to Show/Hide Part of C++ Code
        - `Browse` and `Upload` Button
       
2. The dynamic contents are implemented with following components
    1. Add/Remove locations which will be displayed on the page
    2. Parse and download selected locations to local file along with latitude and longitude
    3. Upload calculated path
    4. Print path on Google Map

3. The calculation part is implemented with following features
    1. Use C++ for calculation
    2. Use `Functional Programming` to achieve the best design
    3. Use `Makefile` to compile the C++ code
<br>

## Functionality
1. Select locations using Google Map
2. Calculate optimal path with Genetic Algorithm
3. Print final optimal path on Google Map
<br>

## Test Result
1. Successful with all tests
2. For more information, please refer to the Test section

<br><br><br>



# 2. Design Instruction

## Build General Layout
1. Download free BootStrap 4.1 template (can be used for commercial purpose) from [https://startbootstrap.com/template-overviews/bare/](https://startbootstrap.com/template-overviews/bare/)
2. Customize the template for overall layout
    1. Modify the overall color theme to `light blue -> light red` gradient
        - Provided background is `image/background_final.png`, a combination of `image/background10.jpg`; and `image/background15.jpg`; other backgrounds are also available
        - Set background to `repeat` for both `index.html` and `profile.php` , since on mobile, normal background can be easily "used up"
    2. Remove and modify all unnecessary sections and texts
    3. The most frequently used colors should be black/light red/light blue along with dark cyan and light violet as mark-ups
3. Add website icons for all websites
    1. Provided icon is "image/paperplane.png";
    2. Syntax: `<link rel="icon" href="image/paperplane.png">`
4. The file extension has to be ".php" for "profile.php" in order to run PHP code
5. For more information, please refer to the documentation under: [https://github.com/LynchZou/Personal-Website](https://github.com/LynchZou/Personal-Website)
<br>

## Build Web Interface
1. Put everything into `container` class of BootStrap
2. Add Google Map API
    1. Following the detailed instruction under the documentation of Google Map API: [https://developers.google.com/maps/documentation/javascript/tutorial](https://developers.google.com/maps/documentation/javascript/tutorial)
    2. Adjust the postion of `Google Map` and `floating-panel`
        - Use `absolute` position to set `floating-panel` on top right of the Map
        - Add an `Add` button right next the default `Search` button

3. Add a `Submit and Download` button
4. Add detailed instructions on how to calculate the path using C++
5. Add a `Click To Show Part Of the C++ Code` button
    1. When clicked, the button will show part of C++ code using `Google Code Pretiffy`
        - Documentation of `Google Code Prettify` is under: [https://github.com/google/code-prettify](https://github.com/google/code-prettify)
    2. After being clicked, the text of button should change to `Click To Hide Part Of the C++ Code`
6. Add `Upload` and `Browse` button with `BootStrap`
7. Add instructions for uploading calculated locations and checking final path
<br>

## Build Dynamic Contents
1. Initialize the Map and center it at `Los Angeles`
    1. Add a `toggleBounce()` function to add animations to the marker
2. Add an `EventListener` of `click` with the `Add` button
    1. Obtain address
    2. Build a geocoder object
    3. Call `AddLocation()`
        - `AddLocation()` will add the address to the website along with a `Remove` button
        - Store latitude and longitude
        - Add a `Remove(num)` function to remove the exact num-th location
3. Add a `submit()` function to process all the locations stored
    1. After processed all the data, call `download(filename, text)`
    2. Download the selected locations to local file
5. When the file form is submitted, make an `AJAX` call using `post` method
    1. Send the request to `php/upload.php`
    2. In `php/upload.php`, store and read the uploaded file, echo the text
    3. On success of the `AJAX` call
        - Parse each of the latitude and longitude
        - Draw the final path on `Google Map`
        - Documentations are under: [https://developers.google.com/maps/documentation/javascript/examples/polyline-simple](https://developers.google.com/maps/documentation/javascript/examples/polyline-simple)
        - Use `lineSymbol` to set the icon to indicate the path
6. Add a `ShowCode()` function to display/hide part of C++ code
<br>

## Build Genetic Algorithm Section
1. In `main.cpp`, simply call `ProcessCommandArgs(argc, argv)`
2. In `TSP.cpp`, implement each of the functions for actual calculation
    1. Add a `parseLocations(const std::string& inputFile)`
        - Read the input file
        - Store the latitude and longitude to a vector of `Location` objects
        - Return the vector described above
    2. Add a `randomPopulations(const std::vector<Location*>& locations, std::mt19937& mt_rand, const int& populationSize)` function
        - Generate random populations
        - Use `std::mt19937` random number generator
        - Return randomly generated populations
    3. Add a `calculateFitness(const std::vector<Location*>& locations, Population* population)`
        - Calculate fitness using `Haversine Distance Formula`
        - Documentations about `Haversine Distance Formula`: [https://www.movable-type.co.uk/scripts/latlong.html](https://www.movable-type.co.uk/scripts/latlong.html)
        - Sum up all the differences between different locations
        - Return the calculated fitness
    4. Add a `selection(std::vector<std::pair<int, double>>& fitness, const int& populationSize, std::mt19937& mt_rand)`
        - Sort the fitness in ascending order
        - Construct probabilities by setting the probability of first two fitness twice more likely than the rest of the first half, and reset the probability to a total of 1
        - Call `pickHelper(int exeTime, const std::vector<double>& probability, std::mt19937& mt_rand)`
            1. Recursively pick the first and second parent for all the probabilities
            2. Use `tail recursion`, meaning `bottom-up` approach
        - Return the selected parents
    5. Add a `crossover(const int& populationSize, std::mt19937& mt_rand, const std::vector<std::pair<int, int>>& parents,const double& mutationChance, Population* population)`
        - Initialize new population
        - Generate crossover index
        - Determine which parent goes first and applies the crossover
        - Generate Mutation
        - Return the new population
3. In `SrcMain.cpp`
    1. Initialize `POPULATION_SIZE`, `GENERATION`, `MUTATION_CHANCE` and `SEEDVALUE`
    2. Loop the following procedure for `GENERATION` times
        - Calculate fitness
        - Pick parents
        - Generate new generation
    3. Calculate fitness for last generation
    4. Select optimal path and write to file
    
<br><br><br>



# 3. Specific Case Warning

## C++ Compiler
  1. The C++ code requires C++11 or higher version of C++ compilers
  2. The use of a compiler with previous version will fail the compilation

## Discontinuity of Web Interface and Calculation
  1. There is a discontinuity about the web interface and actual calculation
  2. The main point that such discontinuity exists, is because I would like to practice my C++ skill
  3. The best solution would be to do all the calculations within JavaScript


<br><br><br>



# 4. Tests

## Test Environment
1. MacBook Pro 13-inch
2. 2560 x 1600 Resolution
3. Intel Iris Plus Graphics 640 1536 MB

## Web Interface Test
1. The web interface looks nice under such test environment
2. All BootStrap features are displayed correctly
3. All fonts are displayed correctly
4. All colors are displayed correctly

## Locations Test
1. Add Location Test
    1. Locations are added to the website correctly
    2. Locations are shown on Google Map correctly
2. Remove Location Test
    1. Locations are removed from website correctly
3. Hide/Show Code Test
    1. C++ code is correctly hidden/shown
    2. The switch between hidden and shown is correct
4. Download Test
    1. The location list is downloaded correctly
    2. The downloaded file does not contain any locations removed
5. Upload Test
    1. Local text file is uploaded correctly
    2. The data stored in uploaded file is processed correctly
    3. The path is printed on Google Map correctly
