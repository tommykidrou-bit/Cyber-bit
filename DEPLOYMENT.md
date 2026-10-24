# LBitas publikavimas per Cloudflare Pages

Tai statinė svetainė: HTML, CSS ir JavaScript. Priklausomybių diegti ir projekto kompiliuoti nereikia.

## Esamas Cloudflare projektas

1. Cloudflare paskyroje atverkite **Workers & Pages** ir esamą svetainės projektą.
2. Patikrinkite, kad Git saugykla yra `tommykidrou-bit/Cyber-bit`, o produkcinė šaka – `main`.
3. Esamo domeno įrašų nekeiskite. Prijungti domenai matomi projekto **Custom domains** skiltyje.
4. Peržiūrėkite naujos versijos GitHub pakeitimus ir sujunkite juos su `main`. Jei automatinis publikavimas įjungtas, Cloudflare pradės diegimą.
5. Projekto **Deployments** skiltyje patikrinkite diegimo rezultatą ir atverkite esamą svetainės adresą.

## Jei reikia prijungti saugyklą iš naujo

Cloudflare **Workers & Pages** skiltyje pasirinkite sukurti **Pages** projektą ir importuoti Git saugyklą. Pasirinkite GitHub paskyrą bei `tommykidrou-bit/Cyber-bit`.

Nustatymai:

- Production branch: `main`
- Framework preset: `None`
- Build command: palikti tuščią
- Build output directory: `.`
- Root directory: saugyklos šaknis (palikti numatytąją)
- Aplinkos kintamųjų šiai versijai nereikia.

Nekurkite antro projekto, jei senasis Pages projektas dar veikia. Pirmiausia patikrinkite jo nustatymus ir prijungtus domenus.

## Naujas domenas

Kai turėsite naują domeną, pridėkite jį Pages projekto **Custom domains** skiltyje ir atlikite Cloudflare nurodytus DNS veiksmus. Svetainės kode domenas neįrašytas, todėl jo pakeitimui kodo taisyti nereikia. Seną domeną pašalinkite tik patikrinę, kad naujas veikia su HTTPS.

## Vietinė patikra

Iš saugyklos katalogo:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Patikrinkite puslapį, mobilųjį meniu, skilčių nuorodas ir privatumo langą.

## Dar nebaigta

- Patvirtinto maketo dizainas įgyvendintas, originalus logotipas ir ZIP vaizdai paruošti WebP formatu kataloge `assets/`.
- `assets/training.webp` pakeistas vartotojo pateiktu 1672 × 941 mokymų originalu. `assets/laboratory.webp` tebėra iškarpa iš patvirtinto maketo; gavus atskirą laboratorijos originalą, pakeisti šį failą ir jo HTML matmenis.
- Vartotojo prašymu grąžintas originalus Žemės ir tinklų paveikslas `assets/earth.webp`; technologijų mygtukai išsaugoti. Gaublio programa nebenaudojama.
- Užklausos forma paruošia laišką į `LBitasx@gmail.com` lankytojo el. pašto programoje; automatinio serverinio siuntimo nėra.
- Patikrinti Cloudflare projektą ir seną domeną paskyroje. Šie nustatymai iš šios kūrimo aplinkos nebuvo pasiekti.

## Turinys

Vartotojo prašymu viešai nerodomas registracijos adresas ir PVM statusas. Pašalintas tyrinėjimų krypčių blokas. Technologijų juostos mygtukai pasirenka užklausos temą arba nukreipia į saugumo skiltį.

Mokymų anonso skiltis `#mokymasis` pakeista privatumo ir anonimiškumo pristatymu; išsaugotas esamas inkaras, kad nenutrūktų nuorodos. Programos tebėra pažymėtos kaip planuojamos.
