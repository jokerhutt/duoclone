type LanguageFlagProps = {
  height?: string;
}


export function LanguageFlag({height = "h-10"}) {
  return (
    <>
      <img src="/French_flag.webp" className={`w-fit ${height} `}/>
    </>
  );
}
