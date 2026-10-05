import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Merhaba, Armoni Evleri hakkında bilgi almak istiyorum.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp üzerinden bize ulaşın"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1FBE5A]"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
