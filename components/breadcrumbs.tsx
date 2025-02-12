import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

interface Breadcrumb {
  name: string;
  route?: string;
  onPress?: () => void;
}

const Breadcrumbs: React.FC<{ paths: Breadcrumb[] }> = ({ paths }) => {
  const handlePress = (index: number) => {
    const path = paths[index]; // Get the current path

    if (path && path.route) {
    router.push(path.route);
    } else if (path.onPress) {
      path.onPress();
    }
  };

  return (
    <View style={styles.breadcrumbsContainer}>
      {paths.map((path, index) => (
        <View key={index} style={styles.breadcrumbItem}>
          <TouchableOpacity
            onPress={() => handlePress(index)}
            disabled={!path.route && !path.onPress}
          >
            <Text
              style={[
                styles.breadcrumbText,
                index === paths.length - 1 && styles.activeCrumb,
              ]}
            >
              {path.name}
            </Text>
          </TouchableOpacity>
          {index < paths.length - 1 && (
            <Text style={styles.separator}>&gt;</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  breadcrumbsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  breadcrumbItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  breadcrumbText: {
    fontSize: 16,
    color: "#333",
  },
  activeCrumb: {
    fontWeight: "bold",
    color: "blue",
  },
  separator: {
    marginHorizontal: 5,
    color: "#666",
  },
});

export default Breadcrumbs;

// Example Usage (React Navigation):
const MyComponent = () => {
  const paths: Breadcrumb[] = [
    // Type the paths array
    { name: "Home", route: "Home" },
    { name: "Products", route: "Products" },
    { name: "Electronics", route: "Electronics" },
    { name: "Televisions" },
  ];

  return (
    <View>
      <Breadcrumbs paths={paths} />
      {/* ... */}
    </View>
  );
};
