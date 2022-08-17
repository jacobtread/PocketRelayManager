export interface Player {
    playerId: number;
    completion: string;
    credits: number;
    creditsSpent: number;
    csReward: number;
    cscompletion: string;
    cstimestamps1: string;
    cstimestamps3: string;
    displayName: string;
    email: string;
    faceCodes: string;
    progress: string;
    inventory: string;
    newItem: string;
    gamesPlayed: number;
    secondsPlayed: number;
}

interface RewardData {
    text: string,
    imageName: string
}

export const CS_REWARD_MAPPING: Record<number, RewardData> = {

    100: {text: "Best of the Best", imageName: "MEMstr"},
    207: {text: "Best of the Best", imageName: "MEMstrF"},


    104: {text: "Operator", imageName: "SqadMstr"},
    105: {text: "Hardcore", imageName: "SpecMstr"},

    106: {text: "Lone Wolf", imageName: "SoloMstr"},
    214: {text: "Lone Wolf", imageName: "SoloMstr"},

    // Weapons
    107: {text: "Street Sweeper", imageName: "ShtgMstr"},
    108: {text: "Marksman", imageName: "AsltMstr"},
    109: {text: "Gun Slinger", imageName: "PstlMstr"},
    110: {text: "SMG Mastery", imageName: "SmgMstr"},
    111: {text: "Sniper", imageName: "SnpMstr"},

    112: {text: "Insurgent", imageName: "RsrgMstr"},
    113: {text: "Rebel", imageName: "ReblMstr"},
    114: {text: "Survivor", imageName: "EarthMstr"},
    217: {text: "Survivor", imageName: "EarthMstr"},
    115: {text: "Defender", imageName: "InvsnMstr"},
    206: {text: "Punisher", imageName: "MstrReckoning"},

    // Enemies
    116: {text: "Dog of War", imageName: "CmbtMstr"},
    211: {text: "Dog of War", imageName: "CmbtMstr"},
    212: {text: "Dog of War", imageName: "CmbtMstr"},


    117: {text: "Death Guard", imageName: "ReapMstr"},
    118: {text: "War Fighter", imageName: "CrbrsMstr"},
    218: {text: "War Fighter", imageName: "CrbrsMstr"},
    119: {text: "Cyber Warrior", imageName: "GethMstr"},
    120: {text: "Collector General", imageName: "CollctrMstr"},

    121: {text: "Monster", imageName: "BloodPak"},
    122: {text: "Council Operative", imageName: "CmdoMstr"},
    216: {text: "Council Operative", imageName: "CmdoMstr"},
    123: {text: "Machinist", imageName: "MachMstr"},
    124: {text: "Outsider", imageName: "Outsider"},

    125: {text: "N7", imageName: "N7Mstr"},
    213: {text: "N7", imageName: "N7Mstr"},

    126: {text: "Nomad", imageName: "MapMstr"},
    127: {text: "Biotic God", imageName: "BioticMstr"},
    215: {text: "Biotic God", imageName: "BioticMstr"},

    128: {text: "Mathemagician", imageName: "TechMstr"},
    209: {text: "Mathemagician", imageName: "TechMstr"},
    210: {text: "Mathemagician", imageName: "TechMstr"},

    150: {text: "Hallowed Hero", imageName: "Halloween"},
    153: {text: "Layalist", imageName: "N7Day"},

    // Banner for Staff
    154: {text: "Developer", imageName: "Bioware"},

    155: {text: "Corsair", imageName: "Corsair"},
    157: {text: "Hero of the Last Days", imageName: "Prophecy"},
    208: {text: "Operation Tribute", imageName: "Zaeed"},
    219: {text: "Heartbreaker", imageName: "VolusLover"},
    220: {text: "Stood Fast, Stood Strong, Stood Together", imageName: "FullTeam"},
}