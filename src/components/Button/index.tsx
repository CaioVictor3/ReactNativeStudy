import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Label } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
};

export function Button({ title, variant = 'primary', icon, ...rest }: ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      {icon}
      <Label variant={variant}>{title}</Label>
    </Container>
  );
}