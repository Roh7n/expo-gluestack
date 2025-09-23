import BackAction from "@/components/BackAction";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ArrowRight } from "lucide-react-native";
import React, { JSX, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
}

interface StepContent {
  title: string;
  subtitle: string;
  fields: JSX.Element;
}

type FormField = keyof FormData;

export default function StepWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  const totalSteps = 3;
  const progress = currentStep / totalSteps;

  const updateFormData = (field: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goToNextStep = () => {
    Keyboard.dismiss();
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    Keyboard.dismiss();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("form submitted!", formData);
  };

  const getStepContent = (): StepContent | null => {
    switch (currentStep) {
      case 1:
        return {
          title: "It is never too late to fall in love",
          subtitle:
            "Sign up to discover meaningful connections —\nor maybe just a really great date.",
          fields: (
            <>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="First name"
                  className="font-nunito-semibold"
                  value={formData.firstName}
                  onChangeText={(text: string) =>
                    updateFormData("firstName", text)
                  }
                />
              </Input>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Last name"
                  className="font-nunito-semibold"
                  value={formData.lastName}
                  onChangeText={(text: string) =>
                    updateFormData("lastName", text)
                  }
                />
              </Input>
            </>
          ),
        };

      case 2:
        return {
          title: "Let's get your contact details",
          subtitle: "We'll need these to keep you updated about your matches.",
          fields: (
            <>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Email address"
                  className="font-nunito-semibold"
                  value={formData.email}
                  onChangeText={(text: string) => updateFormData("email", text)}
                  keyboardType="email-address"
                />
              </Input>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Phone number"
                  className="font-nunito-semibold"
                  value={formData.phone}
                  onChangeText={(text: string) => updateFormData("phone", text)}
                  keyboardType="phone-pad"
                />
              </Input>
            </>
          ),
        };

      case 3:
        return {
          title: "Tell us about yourself",
          subtitle: "Help us find your perfect match with some basic info.",
          fields: (
            <>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Age"
                  className="font-nunito-semibold"
                  value={formData.age}
                  onChangeText={(text: string) => updateFormData("age", text)}
                  keyboardType="numeric"
                />
              </Input>
              <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Gender"
                  className="font-nunito-semibold"
                  value={formData.gender}
                  onChangeText={(text: string) =>
                    updateFormData("gender", text)
                  }
                />
              </Input>
              {/* <CustomInputText
                label="Age"
                value={formData.age}
                onChangeText={(text: string) => updateFormData("age", text)}
                keyboardType="numeric"
              />
              <CustomInputText
                label="Gender"
                value={formData.gender}
                onChangeText={(text: string) => updateFormData("gender", text)}
                // multiline 
              />*/}
            </>
          ),
        };

      default:
        return null;
    }
  };

  const stepContent = getStepContent();

  return (
    <SafeAreaView className="flex-1 ">
      <HStack className=" w-full justify-between items-center px-6">
        <BackAction />
        <Button disabled>
          <ButtonText className="font-nunito-extrabold">
            {" "}
            {currentStep} of {totalSteps}
          </ButtonText>
        </Button>
      </HStack>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-8 mt-6">
            <Text className="font-nunito-extrabold  text-2xl">
              {stepContent?.title}
            </Text>
          </View>

          <View className="h-11 px-8 mt-1">
            <Text className="font-nunito-bold text-gray-500 text-base">
              {stepContent?.subtitle}
            </Text>
          </View>

          <View className="px-8 mt-8 gap-4">{stepContent?.fields}</View>
        </ScrollView>

        <View className="px-8 mb-10 gap-3">
          {currentStep < totalSteps ? (
            <Button
              size="xl"
              onPress={goToNextStep}
              className="w-full rounded-full "
            >
              <ButtonText className="font-nunito-extrabold">
                Continue
              </ButtonText>
              <ButtonIcon as={ArrowRight} />
            </Button>
          ) : (
            <Button
              size="xl"
              onPress={handleSubmit}
              className="w-full rounded-full "
            >
              <ButtonText className="font-nunito-extrabold">
                Complete Registration
              </ButtonText>
              <ButtonIcon as={ArrowRight} />
            </Button>
          )}

          {currentStep > 1 && (
            <Button
              size="xl"
              onPress={goToPreviousStep}
              className="w-full rounded-full"
              action="secondary"
            >
              <ButtonText className="font-nunito-extrabold">Back</ButtonText>
              <ButtonIcon as={ArrowRight} />
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
