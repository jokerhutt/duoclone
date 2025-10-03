
export function LanguageFlag({height = "h-10", icon = "/French_flag.webp"}) {
  return (
    <>
      <img src={icon} className={`${height} `}/>
    </>
  );
}
