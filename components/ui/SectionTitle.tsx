import Text from "deco-sites/fashion/components/ui/Text.tsx";

interface Props {
  title: string;
}

function SectionTitle({ title }: Props) {
  return (
    <h2 class="flex justify-center mb-[52px]">
      <Text variant="heading-2" class="text-center font-title text-primary">
        {title}
      </Text>
    </h2>
  );
}

export default SectionTitle;
