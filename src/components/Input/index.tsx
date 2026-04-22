import { ViewStyle, TextInputProps } from 'react-native';
import { Container, Label, StyledInput } from './styles';

type InputProps = TextInputProps & {
  label?: string;
  containerStyle?: ViewStyle;
};

export function Input({ label, containerStyle, ...rest }: InputProps) {
  return (
    <Container style={containerStyle}>
      {label ? <Label>{label}</Label> : null}
      <StyledInput placeholderTextColor="#B9BBBC" {...rest} />
    </Container>
  );
}
