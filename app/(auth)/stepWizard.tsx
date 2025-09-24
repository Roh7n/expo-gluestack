import BackAction from "@/components/BackAction";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { AlertCircle, ArrowRight, ChevronDownIcon } from "lucide-react-native";
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
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  religion: string;
}

interface StepContent {
  title: string;
  subtitle: string;
  fields: JSX.Element;
}

type FormField = keyof FormData;

export default function StepWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    religion: "",
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
              <View className="gap-4">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Create a profile for
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select>
                        <SelectTrigger size="xl" className="rounded-xl">
                          <SelectInput
                            placeholder="Select option"
                            className="flex-1 font-nunito-semibold"
                          />
                          <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Myself" value="myself" />
                            <SelectItem label="Son" value="son" />
                            <SelectItem label="Daughter" value="daughter" />
                            <SelectItem label="Sister" value="sister" />
                            <SelectItem label="Brother" value="brother" />
                            <SelectItem label="Relative" value="relative" />
                            <SelectItem label="Friend" value="friend" />
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The create a profile for field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>

                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Your Name
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input size="xl" className="rounded-xl">
                        <InputField
                          placeholder="Name"
                          className="font-nunito-semibold"
                          value={formData.name}
                          onChangeText={(text: string) =>
                            updateFormData("name", text)
                          }
                        />
                      </Input>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The your Name field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>
                </View>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="font-nunito-semibold">
                      {" "}
                      Email
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input size="xl" className="rounded-xl">
                    <InputField
                      placeholder="Email address"
                      className="font-nunito-semibold"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircle} />
                    <FormControlErrorText>
                      The email field is required.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </View>
            </>
          ),
        };

      case 2:
        return {
          title: "Let's get your basic details",
          subtitle: "We'll need these to keep you updated about your matches.",
          fields: (
            <>
              <View className="gap-8">
                <View className="flex-row gap-3 ">
                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Date of Birth
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select>
                        <SelectTrigger size="xl" className="rounded-xl">
                          <SelectInput
                            placeholder="Select option"
                            className="flex-1 font-nunito-semibold"
                          />
                          <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                      </Select>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The date of Birth field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>

                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Gender
                        </FormControlLabelText>
                      </FormControlLabel>
                      <View className="flex-row gap-1">
                        <Button
                          className="rounded-full"
                          variant={
                            formData.gender === "male" ? "solid" : "outline"
                          }
                          action={
                            formData.gender === "male" ? "primary" : "secondary"
                          }
                          onPress={() => updateFormData("gender", "male")}
                        >
                          <ButtonText>Male</ButtonText>
                        </Button>

                        <Button
                          className="rounded-full"
                          variant={
                            formData.gender === "female" ? "solid" : "outline"
                          }
                          action={
                            formData.gender === "female"
                              ? "primary"
                              : "secondary"
                          }
                          onPress={() => updateFormData("gender", "female")}
                        >
                          <ButtonText>Female</ButtonText>
                        </Button>
                      </View>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The gender field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>
                </View>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="font-nunito-semibold">
                      {" "}
                      Religion
                    </FormControlLabelText>
                  </FormControlLabel>
                  <View className="flex-row gap-1">
                    <Button
                      className="rounded-full"
                      variant={
                        formData.religion === "hindu" ? "solid" : "outline"
                      }
                      action={
                        formData.religion === "hindu" ? "primary" : "secondary"
                      }
                      onPress={() => updateFormData("religion", "hindu")}
                    >
                      <ButtonText>Hindu</ButtonText>
                    </Button>

                    <Button
                      className="rounded-full"
                      variant={
                        formData.religion === "christian" ? "solid" : "outline"
                      }
                      action={
                        formData.religion === "christian"
                          ? "primary"
                          : "secondary"
                      }
                      onPress={() => updateFormData("religion", "christian")}
                    >
                      <ButtonText>Christian</ButtonText>
                    </Button>

                    <Button
                      className="rounded-full"
                      variant={
                        formData.religion === "muslim" ? "solid" : "outline"
                      }
                      action={
                        formData.religion === "muslim" ? "primary" : "secondary"
                      }
                      onPress={() => updateFormData("religion", "muslim")}
                    >
                      <ButtonText>Muslim</ButtonText>
                    </Button>
                  </View>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircle} />
                    <FormControlErrorText>
                      The Religion field is required.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Caste
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select>
                        <SelectTrigger size="xl" className="rounded-xl">
                          <SelectInput
                            placeholder="Select option"
                            className="flex-1 font-nunito-semibold"
                          />
                          <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="null" value="null" />
                            <SelectItem label="null" value="son" />
                            <SelectItem label="null" value="daughter" />
                            <SelectItem label="null" value="sister" />
                            <SelectItem label="null" value="brother" />
                            <SelectItem label="null" value="relative" />
                            <SelectItem label="null" value="friend" />
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The caste field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>

                  <View className="flex-1">
                    <FormControl>
                      <FormControlLabel>
                        <FormControlLabelText className="font-nunito-semibold">
                          {" "}
                          Caste
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Select>
                        <SelectTrigger size="xl" className="rounded-xl">
                          <SelectInput
                            placeholder="Select option"
                            className="flex-1 font-nunito-semibold"
                          />
                          <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="null" value="null" />
                            <SelectItem label="null" value="son" />
                            <SelectItem label="null" value="daughter" />
                            <SelectItem label="null" value="sister" />
                            <SelectItem label="null" value="brother" />
                            <SelectItem label="null" value="relative" />
                            <SelectItem label="null" value="friend" />
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircle} />
                        <FormControlErrorText>
                          The caste field is required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </View>
                </View>
              </View>

              {/* <Input size="xl" className="rounded-xl">
                <InputField
                  placeholder="Email address"
                  className="font-nunito-semibold"
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
              </Input> */}
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
      <HStack className="w-full justify-between items-center p-5">
        <BackAction />
        <Button disabled>
          <ButtonText className="font-nunito-extrabold ">
            {currentStep} of {totalSteps}
          </ButtonText>
        </Button>
      </HStack>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="px-8 mt-6 ">
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
              className="w-full rounded-full"
              variant="solid"
            >
              <ButtonText className="font-nunito-bold">Continue</ButtonText>
              <ButtonIcon as={ArrowRight} />
            </Button>
          ) : (
            <Button
              size="xl"
              onPress={handleSubmit}
              className="w-full rounded-full"
              variant="solid"
              action="positive"
            >
              <ButtonText className="font-nunito-bold">
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
              <ButtonText className="font-nunito-bold">Back</ButtonText>
              <ButtonIcon as={ArrowRight} />
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
