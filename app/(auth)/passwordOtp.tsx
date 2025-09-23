import BackAction from "@/components/BackAction";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export default function password() {
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isOtpMode, SetIsOtpMode] = React.useState(false);
  const { flow } = useLocalSearchParams();

  const toggleMode = () => {
    SetIsOtpMode(!isOtpMode);
    setPassword("");
    setOtp("");
  };

  const handleContinue = () => {
    Keyboard.dismiss();
    if (flow === "signup") {
      router.push("/stepWizard");
    }
  };

  return (
    <SafeAreaView className=" flex-1 ">
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
          <View className="flex-1 justify-center  px-8 mt-6">
            {!isOtpMode ? (
              <VStack space="sm">
                <Text className="font-nunito-extrabold  text-3xl">
                  Enter your password
                </Text>
                <Input size="xl" className="rounded-xl">
                  <InputField
                    keyboardType="phone-pad"
                    placeholder="Password"
                    className="font-nunito-semibold"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </Input>
              </VStack>
            ) : (
              <View className="gap-3">
                <Text className="font-nunito-extrabold  text-3xl">
                  Enter OTP code
                </Text>
                <OtpInput
                  numberOfDigits={6}
                  autoFocus={false}
                  onTextChange={(text) => setOtp(text)}
                />
              </View>
            )}

            <Button
              size="sm"
              onPress={toggleMode}
              className="w-48 mx-auto rounded-full mt-6"
              action="secondary"
            >
              <ButtonText className="font-nunito-extrabold">
                {isOtpMode ? " Sign in with password" : "Sign in with OTP"}
              </ButtonText>
            </Button>
          </View>
        </ScrollView>
        <View className="px-5 pb-10 gap-2">
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
