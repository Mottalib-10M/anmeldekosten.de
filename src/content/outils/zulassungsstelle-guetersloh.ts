import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '05754';

export default defineGuide({
  id: 'zulassungsstelle-guetersloh',
  group: 'staedte',
  order: 15,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-paderborn', 'zulassungsstelle-herford', 'kfz-kennzeichen', 'kosten', 'auto-abmelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-guetersloh',
    nav: 'Gütersloh',
    card: 'Ein Standort für 13 Kommunen, Kürzel GT, auslaufend HW und WD.',
    title: 'Zulassungsstelle Gütersloh: Herzebrocker Straße, Kürzel GT',
    description: 'Zulassungsstelle Gütersloh: Straßenverkehrsamt des Kreises an der Herzebrocker Straße, Führerscheinstelle, Kürzel GT, auslaufend HW und WD, Gebühren 2026.',
    h1: 'Straßenverkehrsamt Gütersloh: ein Standort für den ganzen Kreis',
    intro: 'Der Kreis Gütersloh lässt alle Fahrzeuge an einer einzigen Stelle zu, an der Herzebrocker Straße in Gütersloh. Außenstellen nennt das Verzeichnis nicht.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Für die 13 Städte und Gemeinden des Kreises Gütersloh, von Rheda-Wiedenbrück und Verl bis Versmold und Halle (Westf.), gibt es laut Verzeichnis des Kraftfahrt-Bundesamts eine einzige Zulassungsstelle: das Straßenverkehrsamt des Kreises, ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}. Dort sitzt auch die Abteilung, die Führerscheine ausstellt und umtauscht. Neu vergeben wird nur GT. HW für Halle in Westfalen und WD für Wiedenbrück stehen im Verzeichnis als auslaufend: Wer sie trägt, behält sie, neu ausgegeben werden sie nicht. Der Kreis hat viele Autos je Kopf: ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner gegen ${h.num(h.Z.META.total.pkwDichte)} im Bund, ähnlich wie in den Kreisen Herford (${h.num(bz(h, '05758').stat!.pkwDichte)}) und Minden-Lübbecke (${h.num(bz(h, '05770').stat!.pkwDichte)}). Insgesamt waren zum ${h.Z.META.fz1Stand} ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)}. Eine Abmeldung kostet ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} am Schalter und ${h.eur(h.M.berechne({ vorgang: 'abmelden', online: true }).gebuehr)} online, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Gibt es im Kreis Gütersloh noch HW- oder WD-Kennzeichen?', a: 'Auf der Straße ja, neu nicht. Das Verzeichnis des Kraftfahrt-Bundesamts führt HW und WD für den Kreis nur als auslaufend. Ein Fahrzeug, das so ein Kennzeichen trägt, behält es, solange die Zulassung besteht. Wer ein Auto mit HW oder WD kauft, fragt bei der Umschreibung nach, ob es bleiben kann; wer nach einer Abmeldung neu zulässt, bekommt GT, denn ein auslaufendes Kürzel wird nicht wieder vergeben.' },
      { q: 'Muss ich aus Rheda-Wiedenbrück oder Verl nach Gütersloh fahren?', a: 'Für den Schalter ja, denn eine Außenstelle steht nicht im Verzeichnis; zuständig ist für alle 13 Kommunen das Straßenverkehrsamt in Gütersloh. Viele Vorgänge lassen sich aber ohne Fahrt erledigen: Abmelden, Ummelden und Anmelden gehen online über i-Kfz, mit Ausweis mit Online-Funktion. Alternativ kann ein Zulassungsdienst mit Vollmacht den Termin übernehmen.' },
      { q: 'Wie viele Elektroautos sind im Kreis Gütersloh zugelassen?', a: `Zum ${h.Z.META.fz1Stand} zählte das Kraftfahrt-Bundesamt ${h.num(bz(h, ID).stat!.bev)} reine Elektro-Pkw und ${h.num(bz(h, ID).stat!.phev)} Plug-in-Hybride. Das sind ${h.pct(bz(h, ID).stat!.bev / bz(h, ID).stat!.pkw)} reine Elektroautos, gegen ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)} im Bund. Halter solcher Fahrzeuge können bei der Zulassung das E-Kennzeichen wählen; die Suche oben zeigt, wo das im Kreis geschieht.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Herzebrocker Straße führt vom Zentrum Richtung Herzebrock-Clarholz; Anschrift und Telefon stehen in der Tabelle. Termine und Wartezeiten regelt der Kreis selbst.',
      `Für Bielefeld, den Kreis Warendorf oder den Kreis Paderborn nennt die Suche oben die eigene Behörde. Wie Abmelden und Kennzeichen-Reservierung zusammenhängen, steht unter ${h.a('auto-abmelden', 'Auto abmelden')}; auslaufende Kürzel zeigt die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')}.`),
  },
  en: {
    slug: 'registration-office-guetersloh',
    nav: 'Gütersloh',
    card: 'One site for 13 towns, code GT, phased-out HW and WD.',
    title: 'Zulassungsstelle Gütersloh: Herzebrocker Straße, code GT',
    description: 'Zulassungsstelle Gütersloh: the district road traffic office on Herzebrocker Straße, licensing office, plate code GT, phased-out HW and WD, and the 2026 fees.',
    h1: 'Gütersloh road traffic office: one site for the whole district',
    intro: 'The Gütersloh district registers every vehicle at a single office, on Herzebrocker Straße in Gütersloh. The directory lists no branches.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `For the 13 towns and municipalities of the Gütersloh district, from Rheda-Wiedenbrück and Verl to Versmold and Halle (Westf.), the Federal Motor Transport Authority’s directory lists a single registration office: the district road traffic office, ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}. The department that issues and exchanges driving licences is there too. Only GT is issued. HW for Halle in Westphalia and WD for Wiedenbrück are listed as phased out: vehicles that carry them keep them, but they are not issued again. The district has many cars per head: ${h.num(s.pkwDichte)} per 1,000 residents against ${h.num(h.Z.META.total.pkwDichte)} nationally, much like the Herford (${h.num(bz(h, '05758').stat!.pkwDichte)}) and Minden-Lübbecke (${h.num(bz(h, '05770').stat!.pkwDichte)}) districts. In all, ${h.num(s.pkw)} cars were registered on ${h.Z.fz1Stand('en')}, rank ${h.num(g.rang)} of ${h.num(g.von)}. Deregistering costs ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} at the counter and ${h.eur(h.M.berechne({ vorgang: 'abmelden', online: true }).gebuehr)} online, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Are HW and WD plates still around in the Gütersloh district?', a: 'On the road yes, as new plates no. The Federal Motor Transport Authority directory lists HW and WD for the district only as phased out. A vehicle carrying one keeps it while the registration lasts. If you buy a car with HW or WD, ask at the transfer whether it can stay; anyone registering again after deregistration gets GT, because a phased-out code is not issued again.' },
      { q: 'Do I have to drive from Rheda-Wiedenbrück or Verl to Gütersloh?', a: 'For the counter, yes: no branch is listed, and the road traffic office in Gütersloh serves all 13 towns. Many procedures need no trip, though: deregistering, re-registering and registering work online through i-Kfz with an ID card that has the online function. Alternatively, a registration agency with a power of attorney can take the appointment for you.' },
      { q: 'How many electric cars are registered in the Gütersloh district?', a: `On ${h.Z.fz1Stand('en')} the Federal Motor Transport Authority counted ${h.num(bz(h, ID).stat!.bev)} fully electric cars and ${h.num(bz(h, ID).stat!.phev)} plug-in hybrids. That is ${h.pct(bz(h, ID).stat!.bev / bz(h, ID).stat!.pkw)} fully electric, against ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)} nationally. Keepers of such vehicles can choose the E plate at registration; the search above shows where that happens in the district.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Herzebrocker Straße runs from the centre towards Herzebrock-Clarholz; address and phone are in the table. The district sets appointments and waiting times itself.',
      `For Bielefeld, the Warendorf district or the Paderborn district the search above names their own office. How deregistering and reserving a number fit together is under ${h.a('auto-abmelden', 'deregistering a car')}; phased-out codes are in the ${h.a('kfz-kennzeichen', 'plate code list')}.`),
  },
});
