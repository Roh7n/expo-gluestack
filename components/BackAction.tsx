import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";

const BackAction = () => {
  const navigation = useNavigation();

  return (
    <View className="px-6 pt-3 pb-2">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-rose-400 rounded-full w-12 h-12 items-center justify-center"
      >
        <ChevronLeft strokeWidth={3} color="black" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default BackAction;
