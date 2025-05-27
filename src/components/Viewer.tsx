interface ViewerProps {
  url: string;
}

export default function Viewer({ url }: ViewerProps) {
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <img
      src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://froggy1014.github.io${url}&count_bg=%232E8555&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=false`}
    />
  );
}
