import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Merhaba, Armoni Evleri hakkında bilgi almak istiyorum.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-cacao text-paper shadow-[0_6px_24px_-6px_rgba(42,23,9,0.55)] transition-transform hover:scale-105"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
