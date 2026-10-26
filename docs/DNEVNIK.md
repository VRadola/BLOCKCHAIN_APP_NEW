# AI dnevnik

## T1 — Postavljanje projekta (19.10.2026.)
- Cilj termina: Upoznavanje sa radom AI
- Najkorisniji prompt (kopiran u cijelosti):
Stranica s više sekcija u Vue. Kafić ima modernu toplu i ugodnu atmosferu i stil. Nemam slika, radno vrijeme je svaki dan od 7 do 20. Možeš izmisliti placeholder za sada pazi da aplikacija mora biti blockchain ali ne implementiramo wallet ali biti će u budućnosti
- Što je AI napravio dobro: Pitao me stvari vezane za kafić poput sitla i atmosfere u kafiću
- Što je AI napravio drugačije nego što sam očekivao:
- Što sam dodao u AGENTS.md: Dodao sam naziv, zajednicu i opis
- Provjera: Provjerio sam stranicu u pregledniku i izrađeno
- Commit:
94ae97e

## T2 — MetaMask wallet integracija (26.10.2026.)
- Cilj termina: Implementirati spajanje MetaMask walleta i slanje ETH-a kolegi na Sepolia test mreži (connect, prikaz adrese/stanja, slanje, status transakcije s Etherscan linkom).
- Najkorisniji prompt (kopiran u cijelosti):
Napravi mi skriptu za slanje etheriuma kolegi preko MetaMask walleta na sepolia test mreži. Možeš dodati i nekakav mini frontend vezan za to. Ako imas još neka pitanja pitaj me prije nego počneš sa izradom
- Što je AI napravio dobro: Prije pisanja koda postavio pitanja (treba li i ERC20, kako se unose adresa/iznos, treba li status transakcije). Kasnije, kad je trebalo prebaciti kod u Vue projekt, sam je pogledao AGENTS.md i pitao smije li dodati ethers.js kao novu biblioteku (umjesto da je samo doda) i gdje točno treba stajati gumb za wallet u sučelju.
- Što je AI napravio drugačije nego što sam očekivao: Prvo je napravio samostalnu HTML demo stranicu za pregled izgleda (uklopljenu u boje i fontove kafića), i tek nakon što sam odobrio izgled i pristup bez nove biblioteke, prešao na stvarnu Vue integraciju (stores/loyalty.js, novi WalletModal.vue, izmjena AppHeader.vue).
- Što sam dodao u AGENTS.md: (nisam ovaj put — AI je primijetio da postoji nedovršen merge marker u AGENTS.md, to još treba riješiti)
- Provjera: Pokrenuo npm run dev, testirao "Dodaj wallet" gumb u headeru, spojio MetaMask na Sepolia mreži, poslao test ETH — transakcija potvrđena i vidljiva na Sepolia Etherscanu.
- Commit:
09c4ff7