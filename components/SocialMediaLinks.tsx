import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";
import "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://github.com/takumma"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://twitter.com/_takumma"
      aria-label="Twitter"
      icon={<FaTwitter fontSize="20px" />}
    />
  </ButtonGroup>
);

export default SocialMediaLinks;
