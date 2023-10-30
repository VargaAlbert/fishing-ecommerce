export const DATA = [
    {
        ID_PRODUCT: 101000000,
        EAN: 8586018469326,
        PRODUCT: "Delphin NEXO 12 zöld",
        SKUPINA: 101000000,
        ROZMER: "0,10mm 6,8kg 130m",
        PACKAGING: 1,
        DESCRIPTION:
            "Kiváló minőségű zsinór a modern horgászat minden kedvelőjének. A NEXO 12 tizenkét egyedi mikroszálasból fonódik! Az új fonási folyamatnak köszönhetően a zsinór pontos keresztmetszetű, erősebb és simább. A megnövekedett kopásállóság szintén fontos paraméter! Ez annak a ténynek is köszönhető, hogy a zsinór felületkezelt, ami sokkal könnyebbé teszi a dobról történő lefutást és a gyűrűkből való kicsúszást. Kis csalik bedobása sem okoz gondot, és a felületkezelésnek köszönhetően a zsinór zaj jelentősen csökkent. Mindezek a tulajdonságok többek között jelentős hatást gyakorolnak a pontosabb dobásra, amire nagy az igény, különösen a versenyhorgászat során. Használhatja a prémium NEXO 12 zsinórt kis patakokon, nagyobb tavak vagy szélsőséges mélyvízi horgászatnál. Az átmérők széles választékának köszönhetően minden stílus szerelmese megtalálja a magának valót.\n\nMM/LBS: 0.10mm/15lbs, 0.12mm/19.1lbs, 0.14mm/22lbs, 0.16mm/24.2lbs, 0.18mm/28.6lbs, 0.20mm/33lbs",
        HMOTNOST: 50.1,
        IMGURL_NO_WATER: "http://moss.sk/obr/101000000.jpg",
        CENA_S_DPH_EU: 29.95,
        CENA_S_DPH_EU_HUF: 12838,
        VIDEA: "",
        SORTIMENT: "Zsinórok és fonott zsinórok | Fonott - főzsinórok | Pergető",
        SKLADOM: "TRUE",
        SKLADOVOST: 10,
        PRIJEM: ""
    },
    {
        ID_PRODUCT: 101000001,
        VARIANT: 101000000,
        EAN: 8586018469333,
        PRODUCT: "Delphin NEXO 12 zöld",
        SKUPINA: 101000001,
        ROZMER: "0,12mm 8,7kg 130m",
        PACKAGING: 1,
        DESCRIPTION:
            "Kiváló minőségű zsinór a modern horgászat minden kedvelőjének. A NEXO 12 tizenkét egyedi mikroszálasból fonódik! Az új fonási folyamatnak köszönhetően a zsinór pontos keresztmetszetű, erősebb és simább. A megnövekedett kopásállóság szintén fontos paraméter! Ez annak a ténynek is köszönhető, hogy a zsinór felületkezelt, ami sokkal könnyebbé teszi a dobról történő lefutást és a gyűrűkből való kicsúszást. Kis csalik bedobása sem okoz gondot, és a felületkezelésnek köszönhetően a zsinór zaj jelentősen csökkent. Mindezek a tulajdonságok többek között jelentős hatást gyakorolnak a pontosabb dobásra, amire nagy az igény, különösen a versenyhorgászat során. Használhatja a prémium NEXO 12 zsinórt kis patakokon, nagyobb tavak vagy szélsőséges mélyvízi horgászatnál. Az átmérők széles választékának köszönhetően minden stílus szerelmese megtalálja a magának valót.\n\nMM/LBS: 0.10mm/15lbs, 0.12mm/19.1lbs, 0.14mm/22lbs, 0.16mm/24.2lbs, 0.18mm/28.6lbs, 0.20mm/33lbs",
        HMOTNOST: 52.2,
        IMGURL_NO_WATER: "http://moss.sk/obr/101000000.jpg",
        CENA_S_DPH_EU: 29.95,
        CENA_S_DPH_EU_HUF: 12838,
        VIDEA: "",
        SORTIMENT: "Zsinórok és fonott zsinórok | Fonott - főzsinórok | Pergető",
        SKLADOM: "TRUE",
        SKLADOVOST: 10,
        PRIJEM: ""
    },
    {
        ID_PRODUCT: 101000002,
        VARIANT: 101000000,
        EAN: 8586018469340,
        PRODUCT: "Delphin NEXO 12 zöld",
        SKUPINA: 101000002,
        ROZMER: "0,14mm 10,0kg 130m",
        PACKAGING: 1,
        DESCRIPTION:
            "Kiváló minőségű zsinór a modern horgászat minden kedvelőjének. A NEXO 12 tizenkét egyedi mikroszálasból fonódik! Az új fonási folyamatnak köszönhetően a zsinór pontos keresztmetszetű, erősebb és simább. A megnövekedett kopásállóság szintén fontos paraméter! Ez annak a ténynek is köszönhető, hogy a zsinór felületkezelt, ami sokkal könnyebbé teszi a dobról történő lefutást és a gyűrűkből való kicsúszást. Kis csalik bedobása sem okoz gondot, és a felületkezelésnek köszönhetően a zsinór zaj jelentősen csökkent. Mindezek a tulajdonságok többek között jelentős hatást gyakorolnak a pontosabb dobásra, amire nagy az igény, különösen a versenyhorgászat során. Használhatja a prémium NEXO 12 zsinórt kis patakokon, nagyobb tavak vagy szélsőséges mélyvízi horgászatnál. Az átmérők széles választékának köszönhetően minden stílus szerelmese megtalálja a magának valót.\n\nMM/LBS: 0.10mm/15lbs, 0.12mm/19.1lbs, 0.14mm/22lbs, 0.16mm/24.2lbs, 0.18mm/28.6lbs, 0.20mm/33lbs",
        HMOTNOST: 51.45,
        IMGURL_NO_WATER: "http://moss.sk/obr/101000000.jpg",
        CENA_S_DPH_EU: 29.95,
        CENA_S_DPH_EU_HUF: 12838,
        VIDEA: "",
        SORTIMENT: "Zsinórok és fonott zsinórok | Fonott - főzsinórok | Pergető",
        SKLADOM: "TRUE",
        SKLADOVOST: 10,
        PRIJEM: ""
    }
];

for (let i = 0; i < DATA.length; i++) {
    delete DATA[i].PACKAGING;
    delete DATA[i].HMOTNOST;
    delete DATA[i].CENA_S_DPH_EU;
    delete DATA[i].VIDEA;
    delete DATA[i].SKLADOVOST;
    delete DATA[i].PRIJEM;
}
