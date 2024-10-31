const footertText = {
  products: [{ name: "EDAS" }, { name: "NSDI" }, { name: "SSGI Journal" }],
  usefulLinks: [
    { name: "SSGI website", url: "https://www.ssgi.gov.et" },
    { name: "KMS", url: "https://www.ssgi.gov.et/kms" },
    {
      name: "Digital Repository",
      url: "https://www.ssgi.gov.et/digital-repository",
    },
  ],
  contact: [
    { name: "Addis Ababa Menilik II Ave, Ethiopia" },
    { name: "info@ssgi.gov.et" },
    { name: "+251-118961050" },
    { name: "+251-115518445" },
  ],
  ssgi: [
    "Ensuring international competitive research, timely and reliable information supply, technological development, social and economic development in the field of human resources, technology, and science.",
  ],
};

export default function Footer({ isOpen }) {
  return (
    <footer className={`mt-10 grid grid-cols-4 justify-items-center`}>
      <hr className="col-span-4 mb-3 min-w-full" />
      <div className="w-full pl-3">
        <img
          className="h-12 w-12"
          src=".\src\assets\small-logo.png"
          alt="SSGI img"
        />
        <p className="l text-justify">{footertText.ssgi}</p>
      </div>
      <div className="">
        <h1 className="text-xl font-semibold capitalize text-stone-500"></h1>
        <p>{Object.keys(footertText)[0]}</p>
        {footertText.products.map((text, index) => (
          <ContactInfo text={text} key={index} />
        ))}
      </div>
      <div className="flex h-44 flex-col gap-3">
        <h1 className="text-xl font-semibold capitalize text-stone-500"></h1>
        <p>{Object.keys(footertText)[1]}</p>
        <Links />
      </div>
      <div className="">
        <h1 className="text-xl font-semibold capitalize text-stone-500"></h1>
        <p>{Object.keys(footertText)[2]}</p>

        {footertText.contact.map((text, index) => (
          <ContactInfo text={text} key={index} />
        ))}
      </div>
      <Copyright />
    </footer>
  );
}
function Copyright() {
  return (
    <div className="col-span-4 mt-5 w-full bg-sky-800 py-4 text-center font-serif text-sky-50">
      &copy;2024-2029 Copyright: SSGI
    </div>
  );
}
function ContactInfo({ text }) {
  return (
    <li className="list-none p-3">
      <p>{text.name}</p>
    </li>
  );
}

function Links() {
  return footertText.usefulLinks.map((link, index) => (
    <a href={link.url} key={index}>
      {link.name}
    </a>
  ));
}
