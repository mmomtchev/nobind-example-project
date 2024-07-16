#include <vector>

// A class that holds an int
class IntObject {
  int value_;

public:
  // The STL conversion typemaps require that the objects
  // are default-constructible and copyable
  IntObject() = default;
  IntObject(int value);
  int get() const;
};

// A method that takes a const std::vector of IntObjects
int ReadOnlyVector(const std::vector<IntObject> &in_data);

// Method that return an std::vector of IntObjects
std::vector<IntObject> ReturnVector();
