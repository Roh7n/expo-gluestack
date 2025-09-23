import BackAction from "@/components/BackAction";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function signup() {
  const [phoneNumber, setPhonenumber] = useState("");

  const handleContinue = () => {
    Keyboard.dismiss();
    router.push({
      pathname: "/(auth)/passwordOtp",
      params: { flow: "signup" },
    });
  };

  // const isValidPhone = phoneNumber.length === 10;

  return (
    <SafeAreaView className=" flex-1">
      <View className="px-6">
        <BackAction />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6">
            <VStack space="sm">
              <Text className="font-nunito-extrabold  text-3xl">
                What's your phone number?
              </Text>
              <Input size="xl" className="rounded-xl">
                <InputField
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                  className="font-nunito-semibold"
                  value={phoneNumber}
                  onChangeText={setPhonenumber}
                />
              </Input>
            </VStack>
          </View>
        </ScrollView>
        <View className="px-8 pb-10 gap-2">
          <Text className="font-nunito-regular text-gray-500 text-center">
            By tapping Continue, you are agreeing to{"\n"}our{" "}
            <Text className="text-gray-700 font-nunito-semibold">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-gray-700 font-nunito-semibold">
              Privacy Policy
            </Text>
          </Text>
          <Button
            size="xl"
            onPress={handleContinue}
            className="w-full rounded-full "
            // disabled={!isValidPhone}
          >
            <ButtonText className="font-nunito-extrabold">Continue</ButtonText>
            <ButtonIcon as={ArrowRight} />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
