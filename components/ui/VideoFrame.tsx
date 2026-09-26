import { Photo } from "@/components/ui/Photo";

type Props = {
  src: string; // adres filmu, np. "/film.mp4"; puste = spokojne pole z napisem
  poster?: string;
  label: string; // opis filmu dla czytników ekranu
  placeholder: string; // napis w pustym polu
  priority?: boolean;
};

// Ramka na film. Dopóki nie ma pliku, pokazuje ciepłe zdjęcie z przyciskiem „play” i podpisem.
export function VideoFrame({ src, poster, label, placeholder, priority }: Props) {
  const frame =
    "relative aspect-[4/3] w-full overflow-hidden rounded-frame bg-sand ring-1 ring-gold/40 shadow-[0_30px_60px_-30px_rgb(31_58_46/0.35)]";
  if (src) {
    return (
      <div className={frame}>
        <video
          src={src}
          poster={poster || undefined}
          aria-label={label}
          controls
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className={frame}>
      <div className="absolute inset-0">
        <Photo name="zapis" alt="" sizes="(min-width: 1024px) 50vw, 100vw" priority={priority} className="h-full">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(31_58_46/0.55),rgb(31_58_46/0.1)_60%)]" />
        </Photo>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-8 text-center text-snow">
        <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/95 text-cranberry shadow-lg">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
        <p className="text-sm font-medium">{placeholder}</p>
      </div>
    </div>
  );
}
