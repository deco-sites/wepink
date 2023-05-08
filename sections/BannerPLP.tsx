import UIBanner, {
  Props,
} from "deco-sites/fashion/components/ui/BannerPLP.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";

function Banner(props: Props) {
  return (
    <Container>
      <UIBanner {...props} />
    </Container>
  );
}

export default Banner;
