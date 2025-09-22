import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormTextField({
  label = "",
  placeholder = "",
  secureTextEntry = false,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full gap-2">
      {label && <Text className="font-nunito-black text-3xl ">{label}</Text>}
      <TextInput
        className="font-nunito-semibold border border-gray-400 rounded-2xl w-full h-12 px-4 mt-2 text-base"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        autoCapitalize="none"
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3/4 -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOff size={25} color="gray" />
          ) : (
            <Eye size={25} color="gray" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
