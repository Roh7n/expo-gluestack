import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function signin() {
  const [phonenumber, setPhonenumber] = useState("");

  const handleLogin = () => {
    console.log(phonenumber);
  };

  return (
    <SafeAreaView className=" h-full ">
      <ScrollView contentContainerClassName="h-full">
        <View className="flex-1  justify-center items-center px-5">
          <View className="w-48 h-80 border-4 border-gray-600 rounded-3xl mb-10 justify-center items-center">
            <View className="w-20 h-20 border-2 bg-white rounded-xl overflow-hidden">
              <Image className="w-full h-full" />
            </View>
          </View>

          <View className="items-center mb-10 gap-4">
            <View className="flex-row items-center gap-2">
              <Image
                source={require("../assets/icons/icon.png")}
                className="w-16 h-16"
              />
              <Text className="font-nunito-black text-5xl p-2">Mirash</Text>
            </View>
            <Text className="font-nunito-bold text-typography-500 text-2xl text-center mt-2">
              It is never too late to{"\n"}fall in love
            </Text>
          </View>
          <Link href="/signup" asChild>
            <Button className="rounded-full w-3/6 mb-2" size="lg">
              <ButtonText className="font-nunito-bold">
                Create an account
              </ButtonText>
            </Button>
          </Link>

          <Link href="/signin" asChild>
            <Button className="rounded-full w-3/6" size="lg" variant="outline">
              <ButtonText className="font-nunito-bold">Sign in</ButtonText>
            </Button>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
