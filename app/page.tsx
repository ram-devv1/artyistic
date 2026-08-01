import Image from "next/image";

import { CopyCommand } from "@/components/copy-command";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#D8CCB4]/10 bg-[#090D0F]/90 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[#D8CCB4]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <a href="#journey" className="flex min-h-11 shrink-0 items-center text-[#D8CCB4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8B16A]">
            Artystic <span className="px-2 text-[#A24A31]">/</span> Odysseus
          </a>
          <nav aria-label="Primary navigation" className="ml-auto flex min-w-0 items-center gap-5 overflow-x-auto">
            <a href="#journey" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Journey</a>
            <a href="#memory" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Memory</a>
            <a href="#recognition" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Recognition</a>
            <a href="#invoke" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Invoke</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-[#090D0F] text-[#D8CCB4]">
        <section id="journey" aria-labelledby="journey-title" className="relative isolate min-h-[calc(100svh-2.75rem)] overflow-hidden border-b border-[#D8CCB4]/10">
          <Image
            src="/assets/odysseus-hero.webp"
            alt="Storm-dark Aegean voyage collage tracing the long return to Ithaca"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(9,13,15,0.98)_0%,rgba(9,13,15,0.74)_45%,rgba(9,13,15,0.18)_100%)]" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.75rem)] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <h1 id="journey-title" className="max-w-4xl font-[var(--font-serif)] text-6xl leading-[0.88] tracking-[-0.055em] text-[#D8CCB4] sm:text-8xl lg:text-[9rem]">
              The Long Return
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D8CCB4]/78 sm:text-xl">
              Odysseus leaves a burning victory behind and carries the dead across ten more years of sea. He survives, but survival does not leave him innocent, whole, or finished.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#invoke" className="inline-flex min-h-12 items-center border border-[#A24A31] bg-[#A24A31] px-5 font-semibold text-[#090D0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8B16A]">
                Invoke the theme <span aria-hidden="true" className="ml-3">→</span>
              </a>
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[#D8CCB4]/55">20 years absent · one ship returns</span>
            </div>
            <nav aria-label="Odysseus voyage index" className="mt-12 border-t border-[#D8CCB4]/20 pt-5">
              <ol className="grid gap-3 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-[#D8CCB4]/58 sm:grid-cols-3 lg:grid-cols-6">
                <li><a href="#journey">Ash</a></li>
                <li><a href="#sea">Loss</a></li>
                <li><a href="#cunning">Cunning</a></li>
                <li><a href="#memory">Shades</a></li>
                <li><a href="#recognition">Signs</a></li>
                <li><a href="#invoke">Peace</a></li>
              </ol>
            </nav>
          </div>
        </section>

        <section id="sea" aria-labelledby="sea-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
              <h2 id="sea-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] text-[#D8CCB4] sm:text-7xl">The cost of return</h2>
              <p className="max-w-3xl text-xl leading-9 text-[#D8CCB4]/72">
                The voyage is not a catalogue of monsters. It is a register of decisions, warnings ignored, men lost, and a horizon that repeatedly lets Ithaca appear before taking it away.
              </p>
            </div>
            <ol className="mt-14 grid border-y border-[#D8CCB4]/15 sm:grid-cols-2 lg:grid-cols-3">
              <li className="border-b border-[#D8CCB4]/15 p-6 sm:border-r lg:border-b"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">Troy</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">Smoke, looted bronze, and victory already curdling into absence.</p></li>
              <li className="border-b border-[#D8CCB4]/15 p-6 lg:border-b"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">The cave</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">“Nobody” saves the crew; a revealed name gives Poseidon the route home.</p></li>
              <li className="border-b border-[#D8CCB4]/15 p-6 sm:border-r lg:border-r-0"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">Almost home</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">Ithaca enters sight. The wind-bag opens while its captain sleeps.</p></li>
              <li className="border-b border-[#D8CCB4]/15 p-6 lg:border-b-0 lg:border-r"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">Six taken</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">At Scylla, command becomes the choice of who cannot be saved.</p></li>
              <li className="border-b border-[#D8CCB4]/15 p-6 sm:border-b-0 sm:border-r"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">One hull</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">The Laestrygonians empty the fleet until only his black ship remains.</p></li>
              <li className="p-6"><span className="font-[var(--font-mono)] text-xs text-[#C8B16A]">One survivor</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">After Helios, every oar bench is silent except the one memory must fill.</p></li>
            </ol>
          </div>
        </section>

        <section id="cunning" aria-labelledby="cunning-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <h2 id="cunning-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">Every escape leaves a mark</h2>
            <div className="grid gap-px bg-[#D8CCB4]/15 sm:grid-cols-2">
              <article className="bg-[#090D0F] p-7"><h3 className="font-[var(--font-serif)] text-3xl">Nobody survives the cave</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">Odysseus hides beneath wool, then pride makes him name himself across the water.</p></article>
              <article className="bg-[#090D0F] p-7"><h3 className="font-[var(--font-serif)] text-3xl">Circe suspends the year</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">A cup changes bodies; moly, a blade, and an oath restore them. Survival remains negotiation.</p></article>
              <article className="bg-[#090D0F] p-7"><h3 className="font-[var(--font-serif)] text-3xl">Desire is given a boundary</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">He hears the Sirens bound upright while the crew rows past with sealed ears.</p></article>
              <article className="bg-[#090D0F] p-7"><h3 className="font-[var(--font-serif)] text-3xl">Cunning cannot save everyone</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">His intelligence is practical and violent: it preserves the vessel by accepting six deaths.</p></article>
            </div>
          </div>
        </section>

        <section id="memory" aria-labelledby="memory-title" className="border-b border-[#D8CCB4]/10">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="relative min-h-[32rem] overflow-hidden lg:min-h-[48rem]">
              <Image
                src="/assets/odysseus-underworld.webp"
                alt="Underworld remembrance collage of sacrifice, memory, and counsel"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
              <h2 id="memory-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">The dead speak</h2>
              <p className="mt-7 text-lg leading-8 text-[#D8CCB4]/70">The underworld belongs to Odysseus’s reckoning. The war’s famous kings enter only as shadows inside his return.</p>
              <div className="mt-10 space-y-8">
                <article className="border-t border-[#D8CCB4]/15 pt-6"><h3 className="font-[var(--font-serif)] text-3xl text-[#D8CCB4]">Achilles rejects dead glory</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">His answer strips victory of its polish: life without rank would be worth more than rule among shades.</p></article>
                <article className="border-t border-[#D8CCB4]/15 pt-6"><h3 className="font-[var(--font-serif)] text-3xl text-[#D8CCB4]">Agamemnon warns of the door</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">A king can reach home and still be murdered there. Odysseus learns to return concealed.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section id="recognition" aria-labelledby="recognition-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
              <div>
                <h2 id="recognition-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">Home arrives as a sequence of signs</h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#D8CCB4]/70">Athena folds him into mist and a beggar’s body. Recognition comes quietly, through witnesses that cannot be persuaded by a crown.</p>
              </div>
              <div className="relative min-h-[30rem] overflow-hidden border border-[#D8CCB4]/10">
                <Image
                  src="/assets/odysseus-homecoming.webp"
                  alt="Archival collage of Odysseus returning to Penelope with the archer and Athena's owl"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <article className="border-t border-[#D8CCB4]/15 pt-6"><h3 className="font-[var(--font-serif)] text-3xl">The old dog knows first</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Argos raises his head, recognizes the hidden master, and dies after keeping the twenty-year watch.</p></article>
              <article className="border-t border-[#D8CCB4]/15 pt-6"><h3 className="font-[var(--font-serif)] text-3xl">The body keeps its name</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Eurycleia finds the scar beneath the disguise: identity preserved where speech still withholds it.</p></article>
              <article className="border-t border-[#D8CCB4]/15 pt-6"><h3 className="font-[var(--font-serif)] text-3xl">The bed cannot be moved</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Penelope’s final test is shared knowledge: their bed was built around a living olive tree.</p></article>
            </div>
          </div>
        </section>

        <section id="invoke" aria-labelledby="invoke-title" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 id="invoke-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">String the bow. End the cycle.</h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#D8CCB4]/70">The bow restores Odysseus’s name through violence. The olive-root bed restores the marriage through memory. Athena must still stop revenge from repeating itself.</p>
              </div>
              <div className="border-y border-[#D8CCB4]/20 py-8">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[#C8B16A]">Artystic theme command</p>
                <pre className="mt-5 overflow-x-auto font-[var(--font-mono)] text-2xl text-[#D8CCB4] sm:text-4xl"><code>npx artystic</code></pre>
                <div className="mt-7"><CopyCommand command="npx artystic" /></div>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#D8CCB4]/58">Invoke <code className="text-[#C8B16A]">artystic odysseus</code> for the narrative, palette, typography, imagery, motion budget, and source boundaries of The Long Return.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D8CCB4]/10 bg-[#090D0F] px-4 py-10 text-[#D8CCB4] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.24fr_0.76fr]">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[#C8B16A]">Source boundary</p>
          <p className="max-w-4xl text-sm leading-7 text-[#D8CCB4]/58">
            Homeric material grounds the journey, losses, and recognitions. Later visual reception supplies distinct vase and object traditions; it is not Bronze Age documentary evidence. The survivor’s-guilt frame, cinematic scale, and this design are an original modern interpretation, not a diagnosis made by Homer or an archaeological reconstruction.
          </p>
        </div>
      </footer>
    </>
  );
}
