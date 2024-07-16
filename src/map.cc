#include "map.h"
#include <stdexcept>

void PutMap(std::map<std::string, std::string> &in_data) {
  if (in_data["expected"] != "value") throw new std::logic_error{"Did no't receive expected data"};
}

std::map<std::string, std::string> GetMap() {
  std::map<std::string, std::string> out_data;
  out_data["returned"] = "value";
  return out_data;
}
