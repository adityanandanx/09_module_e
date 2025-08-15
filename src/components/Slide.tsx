type Props = {
  image: { url: string; name: string };
  isActive: boolean;
};

const Slide = ({ image, isActive }: Props) => {
  return (
    <div>
      <img src={image.url} />
    </div>
  );
};

export default Slide;
