import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import * as React from "react";
import { Button, ButtonIcon } from "./ui/button";

const BackAction = () => {
  const navigation = useNavigation();

  return (
    <Button
      size="xl"
      onPress={() => navigation.goBack()}
      className="rounded-full w-12 h-12"
    >
      <ButtonIcon as={ChevronLeft} />
    </Button>
  );
};

export default BackAction;
