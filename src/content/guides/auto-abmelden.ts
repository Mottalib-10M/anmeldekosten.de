import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { Eingabe } from '../../lib/engine/gebuehren';

const b = (h: Helpers, e: Eingabe) => h.M.berechne(e);
function faelle(h: Helpers): string {
  const de = h.lang === 'de';
  const F: Array<[string, Eingabe]> = [
    [de ? 'Abmelden am Schalter' : 'Deregister at the counter', { vorgang: 'abmelden' }],
    [de ? 'Abmelden online' : 'Deregister online', { vorgang: 'abmelden', online: true }],
    [de ? 'Abmelden mit Reservierung des Kennzeichens' : 'Deregister and reserve the plate', { vorgang: 'abmelden', reservierung: true }],
    [de ? 'Später: Wiederzulassung mit reserviertem Kennzeichen' : 'Later: re-register with the reserved plate', { vorgang: 'wieder' }],
    [de ? 'Später: Wiederzulassung online' : 'Later: re-register online', { vorgang: 'wieder', online: true }],
    [de ? 'Später: Zulassung mit neuem Kennzeichen' : 'Later: register with a new plate', { vorgang: 'gebraucht' }],
  ];
  const rows = F.map(([t, e]) => { const r = b(h, e); return [t, r.fest.map((z) => z.nr).filter((x, i, a) => a.indexOf(x) === i).join(' + '), h.eur(r.gebuehr), `${h.eur(r.min)} – ${h.eur(r.max)}`]; });
  return h.table(de ? ['Schritt', 'GebOSt-Nr.', 'Gebühr', 'Mit Nebenposten'] : ['Step', 'GebOSt no.', 'Fee', 'With small items'], rows,
    de ? `Abmelden und wieder anmelden, GebOSt ${h.P.gebost_stand.de}` : `Deregistering and re-registering, GebOSt ${h.P.gebost_stand.en}`, ['l', 'l', 'r', 'r']);
}

export default defineGuide({
  id: 'auto-abmelden',
  group: 'kosten',
  order: 4,
  mini: 'abmelden',
  miniHref: 'kosten',
  related: ['kosten', 'auto-online-anmelden', 'saisonkennzeichen', 'ausfuhrkennzeichen', 'auto-anmelden-kosten'],
  sources: ['gebost', 'fzv16', 'fzv10', 'berlinZul', 'kbaAv'],
  de: {
    slug: 'auto-abmelden',
    nav: 'Auto abmelden',
    card: 'Gebühr vor Ort und online, Kennzeichen reservieren, Steuer und Versicherung.',
    title: 'Auto abmelden 2026: Kosten, Unterlagen, Kennzeichen behalten',
    description: 'Auto abmelden 2026: Gebühr nach GebOSt vor Ort und online, Kennzeichen reservieren, nötige Unterlagen, Ende von Steuer und Versicherung, Wiederzulassung.',
    h1: 'Auto abmelden: Kosten, Ablauf und was danach endet',
    intro: 'Verkauf, Verschrottung, Winterpause oder Export: Wer ein Auto nicht mehr fahren will, setzt es außer Betrieb. Die Gebühr ist klein, aber ein paar Entscheidungen hängen daran.',
    resume: (h) => { const v = b(h, { vorgang: 'abmelden' }), o = b(h, { vorgang: 'abmelden', online: true }); return `Abmelden heißt amtlich Außerbetriebsetzung und ist in § 16 der Fahrzeug-Zulassungsverordnung geregelt. Der Halter legt der Zulassungsbehörde die Zulassungsbescheinigung Teil I und die Kennzeichenschilder vor; die Behörde entfernt die Stempelplakette, vermerkt die Außerbetriebsetzung und gibt Papiere und Schilder zurück. Die Gebühr beträgt nach Nummer 224.1 der Gebührenordnung ${h.eur(h.P.land['224.1'])}, mit dem Eintrag beim Kraftfahrt-Bundesamt ${h.eur(v.max)} am Schalter. Online nach Nummer 224.2 sind es ${h.eur(h.P.land['224.2'])}, zusammen ${h.eur(o.max)}. Berlin nennt für die Abmeldung vor Ort ${h.eur(h.P.lokal['11000'].posten[0].betrag)}, was genau dieser Rechnung entspricht. Wer das Fahrzeug später wieder zulassen will, kann das Kennzeichen bis zu ${h.num(h.P.fzv.reservierung_monate)} Monate reservieren lassen, für ${h.eur(h.P.land['230'])}. Mit der Abmeldung endet die Kfz-Steuer, und der Versicherer erfährt davon durch die Behörde; beides geschieht ohne eigenen Antrag. Abmelden darf auch ein Dritter, der alle Unterlagen vorlegt.`; },
    faqs: (h) => [
      { q: 'Muss ich das Auto beim Verkauf selbst abmelden?', a: 'Nein, das ist keine Pflicht. Ein zugelassenes Auto darf verkauft werden; der Käufer meldet es dann auf sich um. Viele Verkäufer melden trotzdem vorher ab, um sicherzugehen, dass Steuer und Versicherung nicht weiterlaufen, falls der Käufer die Umschreibung verschleppt. Wer zugelassen verkauft, sollte den Verkauf mit Datum und Uhrzeit schriftlich festhalten und der Versicherung und der Zulassungsbehörde melden.' },
      { q: 'Kann jemand anderes mein Auto abmelden?', a: `Ja. § 16 der Fahrzeug-Zulassungsverordnung sagt: Wer alle Unterlagen vorlegt, also Zulassungsbescheinigung Teil I und die gestempelten Schilder, gilt als bevollmächtigt. Eine schriftliche Vollmacht ist dann nicht nötig. Die Gebühr bleibt ${h.eur(b(h, { vorgang: 'abmelden' }).gebuehr)} am Schalter. Online geht es nur mit dem Personalausweis des Halters.` },
      { q: 'Wann endet die Kfz-Steuer nach dem Abmelden?', a: 'Mit dem Tag der Außerbetriebsetzung. Die Zulassungsbehörde meldet die Abmeldung elektronisch an das Hauptzollamt, das zu viel gezahlte Steuer anteilig erstattet, meist einige Wochen später auf das Konto des Lastschriftmandats. Einen eigenen Antrag brauchen Sie nicht. Der Versicherer erfährt die Abmeldung ebenfalls von der Behörde; je nach Vertrag endet er oder ruht beitragsfrei, und die Schadenfreiheitsklasse bleibt meist für eine spätere Zulassung erhalten.' },
      { q: 'Was passiert mit den Schildern nach dem Abmelden?', a: `Sie bekommen sie entstempelt zurück. Behalten lohnt sich, wenn Sie das Kennzeichen für ${h.eur(h.P.land['230'])} reservieren: Bei einer Wiederzulassung innerhalb von ${h.num(h.P.fzv.reservierung_monate)} Monaten werden dieselben Schilder neu gestempelt, Sie sparen den Schilderpräger. Ohne Reservierung können Sie sie entsorgen; das Kennzeichen geht dann an den Bestand der Behörde zurück.` },
    ],
    body: (h) => `<h2>Die Kosten Schritt für Schritt</h2>
<p>Abmelden ist der günstigste Zulassungsvorgang. Teurer wird es erst, wenn das Auto später wieder auf die Straße soll. Die Tabelle zeigt beide Seiten: die Abmeldung selbst und die möglichen Wege zurück.</p>
${faelle(h)}
<p>Die Reservierung lohnt sich vor allem bei einem Wunschkennzeichen oder wenn die alten Schilder noch gut sind. Sie kostet ${h.eur(h.P.land['230'])} und hält das Kennzeichen bis zu ${h.num(h.P.fzv.reservierung_monate)} Monate ab dem Tag der Außerbetriebsetzung frei. Ausnahme: Ein Kennzeichen, das Sie nach einem Umzug aus einem anderen Bezirk mitgenommen haben, kann bei der Abmeldung im neuen Bezirk nicht reserviert werden.</p>
<h2>Was Sie mitbringen</h2>
<p>Am Schalter genügen die Zulassungsbescheinigung Teil I, die beiden Kennzeichenschilder und ein Ausweis. Die Zulassungsbescheinigung Teil II ist für die Abmeldung nicht nötig, wohl aber für eine spätere Zulassung auf einen neuen Halter. Fehlt ein Schild, weil es gestohlen wurde, verlangen die Behörden meist eine Bestätigung der Polizei; ist der Fahrzeugschein verloren, eine Versicherung an Eides statt. Beides kostet zusätzlich und verlängert den Termin.</p>
<h2>Online abmelden</h2>
<p>Die internetbasierte Außerbetriebsetzung ist der älteste Online-Dienst der Zulassungsbehörden und kostet ${h.eur(h.P.land['224.2'])} statt ${h.eur(h.P.land['224.1'])}. Sie brauchen den Personalausweis mit Online-Funktion, die Zulassungsbescheinigung Teil I mit freigelegtem Sicherheitscode und Kennzeichenschilder mit Stempelplaketten, die einen verdeckten Code tragen. Plaketten von vor 2015 haben diesen Code nicht; dann geht es nur am Schalter. Den Code legen Sie frei, indem Sie die Plakette ankratzen; danach ist sie zerstört, und das Auto darf nicht mehr fahren.</p>
<!--mini:online-->
<h2>Abmelden, stilllegen, verschrotten: die Unterschiede</h2>
<p>Ein abgemeldetes Fahrzeug darf nicht auf öffentlichen Straßen fahren und auch nicht dort abgestellt werden; es muss auf einem privaten Grundstück oder in einer Garage stehen. Wer das Auto nur für den Winter stilllegen will, prüft besser ein ${h.a('saisonkennzeichen', 'Saisonkennzeichen')}: Es spart das jährliche Ab- und Anmelden. Bei einer Verschrottung stellt der anerkannte Verwertungsbetrieb einen Verwertungsnachweis aus, den die Behörde bei der Abmeldung sehen will. Für einen Verkauf ins Ausland gibt es das ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')}.</p>
<h2>Wieder anmelden</h2>
<p>Ein abgemeldetes Fahrzeug bleibt im Register und kann jederzeit wieder zugelassen werden. War die Hauptuntersuchung in der Zwischenzeit fällig, muss sie vor der Wiederzulassung nachgeholt werden. Mit reserviertem Kennzeichen kostet die Wiederzulassung ${h.eur(h.P.land['221.6'])} am Schalter und ${h.eur(h.P.land['221.7'])} online; ohne Reservierung ist es eine normale Zulassung nach Nummer 221.1, und die Kosten stehen bei der ${h.a('auto-anmelden-kosten', 'Anmeldung')}.</p>
<h2>Vier Anlässe und worauf es jeweils ankommt</h2>
<p><strong>Verkauf an Privat.</strong> Wer vor der Übergabe abmeldet, ist auf der sicheren Seite: Ab dem Tag der Außerbetriebsetzung zahlt er weder Steuer noch Versicherung, und Bußgelder des Käufers landen nicht bei ihm. Der Käufer braucht dann ein Kurzzeitkennzeichen oder einen Anhänger, um das Auto abzuholen.</p>
<p><strong>Verkauf an einen Händler.</strong> Händler übernehmen die Abmeldung oft selbst und lassen sich dafür Fahrzeugschein und Schilder geben. Halten Sie im Kaufvertrag fest, bis wann das geschieht, und prüfen Sie später den Bescheid über das Ende der Steuer.</p>
<p><strong>Verschrottung.</strong> Der anerkannte Verwerter stellt den Verwertungsnachweis aus. Manche melden das Fahrzeug im Auftrag gleich mit ab; sonst legen Sie den Nachweis mit Fahrzeugschein und Schildern bei der Behörde vor.</p>
<p><strong>Längere Pause.</strong> Ein Auto, das monatelang steht, kostet ohne Abmeldung Steuer und Versicherung. Die Rechnung lohnt sich, sobald die Pause länger dauert, als die Gebühren für Ab- und Wiederanmelden an Steuer und Beitrag sparen; mit reserviertem Kennzeichen bleiben dabei Schilder und Nummer erhalten.</p>`,
  },
  en: {
    slug: 'deregister-car-germany',
    nav: 'Deregister a car',
    card: 'Fee in person and online, plate reservation, tax and insurance.',
    title: 'Deregister a car in Germany 2026: cost, documents, plates',
    description: 'Deregistering a car in Germany (Abmeldung) in 2026: the fee in person and online, reserving the plate, documents, end of tax and insurance, re-registration.',
    h1: 'Deregistering a car in Germany: cost, steps and what ends',
    intro: 'Sale, scrapping, a winter lay-up or export: if you stop using a car, you take it off the road. The fee is small, but a few decisions hang on it.',
    resume: (h) => { const v = b(h, { vorgang: 'abmelden' }), o = b(h, { vorgang: 'abmelden', online: true }); return `Deregistering a car is officially called Außerbetriebsetzung and is governed by § 16 of the Vehicle Registration Ordinance (FZV). The keeper shows the registration office registration certificate part I and the number plates; the office removes the registration seal, records the deregistration and hands back the papers and plates. The fee is ${h.eur(h.P.land['224.1'])} under number 224.1 of the fee schedule, ${h.eur(v.max)} at the counter including the Federal Motor Transport Authority’s entry. Online under number 224.2 it is ${h.eur(h.P.land['224.2'])}, ${h.eur(o.max)} in all. Berlin quotes ${h.eur(h.P.lokal['11000'].posten[0].betrag)} for deregistering in person, exactly this sum. If you want to register the car again later, you can reserve the plate for up to ${h.num(h.P.fzv.reservierung_monate)} months for ${h.eur(h.P.land['230'])}. Deregistration ends vehicle tax, and the office informs the insurer; neither needs a separate application. A third party who brings all the documents may also deregister.`; },
    faqs: (h) => [
      { q: 'Do I have to deregister my car myself when I sell it in Germany?', a: 'No, it is not compulsory. A registered car may be sold, and the buyer then transfers it into their name. Many sellers still deregister first so that tax and insurance do not keep running if the buyer delays the transfer. If you sell it registered, record the sale with date and time in writing and report it to the insurer and the registration office.' },
      { q: 'Can someone else deregister my car?', a: `Yes. § 16 of the Vehicle Registration Ordinance says that anyone presenting all the documents, registration certificate part I and the sealed plates, is deemed authorised. No written power of attorney is needed then. The fee stays at ${h.eur(b(h, { vorgang: 'abmelden' }).gebuehr)} at the counter. Online it only works with the keeper’s own ID card.` },
      { q: 'When does vehicle tax stop after deregistering?', a: 'On the day of deregistration. The registration office reports it electronically to the customs office, which refunds any tax overpaid pro rata, usually a few weeks later, to the account of the direct-debit mandate. You do not need to apply. The insurer is informed by the office too; depending on the contract it ends or is suspended free of charge, and your no-claims class is usually kept for a later registration.' },
      { q: 'What happens to the number plates after deregistering?', a: `You get them back with the seal removed. Keeping them pays off if you reserve the number for ${h.eur(h.P.land['230'])}: on re-registration within ${h.num(h.P.fzv.reservierung_monate)} months the same plates are sealed again and you save a trip to the plate maker. Without a reservation you can dispose of them; the number then returns to the office’s pool.` },
    ],
    body: (h) => `<h2>The cost step by step</h2>
<p>Deregistering is the cheapest registration procedure. It only gets dearer when the car is to go back on the road. The table shows both sides: the deregistration itself and the possible ways back.</p>
${faelle(h)}
<p>A reservation is worth it above all for a personalised number or when the old plates are still in good shape. It costs ${h.eur(h.P.land['230'])} and holds the number for up to ${h.num(h.P.fzv.reservierung_monate)} months from the day of deregistration. One exception: a plate you brought from another district after a move cannot be reserved when you deregister in the new district.</p>
<h2>What to bring</h2>
<p>At the counter, registration certificate part I, both number plates and an ID are enough. Registration certificate part II is not needed to deregister, though it is for a later registration to a new keeper. If a plate is missing because it was stolen, offices usually ask for a police confirmation; if the certificate is lost, a statutory declaration. Both cost extra and lengthen the appointment.</p>
<h2>Deregistering online</h2>
<p>Online deregistration is the registration offices’ oldest internet service and costs ${h.eur(h.P.land['224.2'])} instead of ${h.eur(h.P.land['224.1'])}. You need an ID card with the online function, registration certificate part I with the security code uncovered, and plates whose seals carry a hidden code. Seals from before 2015 do not have it; then only the counter will do. You uncover the code by scratching the seal, which destroys it, after which the car may no longer be driven.</p>
<!--mini:online-->
<h2>Deregistering, laying up, scrapping: the differences</h2>
<p>A deregistered vehicle may neither be driven on public roads nor parked there; it has to stand on private land or in a garage. If you only want to lay the car up for the winter, consider a ${h.a('saisonkennzeichen', 'seasonal plate')}: it saves deregistering and registering every year. When a car is scrapped, the approved recycling firm issues a certificate of disposal that the office wants to see at deregistration. For selling abroad there is the ${h.a('ausfuhrkennzeichen', 'export plate')}.</p>
<h2>Registering again</h2>
<p>A deregistered vehicle stays in the register and can be registered again at any time. If the roadworthiness test fell due in the meantime, it must be done before re-registration. With a reserved plate, re-registering costs ${h.eur(h.P.land['221.6'])} at the counter and ${h.eur(h.P.land['221.7'])} online; without a reservation it is a normal registration under number 221.1, and the costs are under ${h.a('auto-anmelden-kosten', 'registration costs')}.</p>
<h2>Four occasions and what matters in each</h2>
<p><strong>Selling privately.</strong> Deregistering before handing over is the safe route: from the day of deregistration you pay neither tax nor insurance, and the buyer’s fines do not reach you. The buyer then needs a short-term plate or a trailer to collect the car.</p>
<p><strong>Selling to a dealer.</strong> Dealers often deregister the car themselves and take the certificate and plates for that purpose. Put in the contract by when this will happen, and check the notice confirming that tax has ended.</p>
<p><strong>Scrapping.</strong> The approved recycler issues the certificate of disposal. Some deregister the car for you; otherwise you take the certificate, the registration document and the plates to the office.</p>
<p><strong>A longer break.</strong> A car standing for months still costs tax and insurance unless it is deregistered. It pays once the break saves more in tax and premium than the fees for deregistering and re-registering; with a reserved plate you keep the plates and the number.</p>`,
  },
});
