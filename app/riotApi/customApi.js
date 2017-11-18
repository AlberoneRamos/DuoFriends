export function getRoleInfo(roleNumber) {
    var path = "../../../assets/images/";
    var roles = [
        "Top",
        "Mid",
        "Jungle",
        "Bot",
        "Support",
        "Fill"
    ];
    return [
        roles[roleNumber - 1],
        path + roles[roleNumber - 1] + "_icon.png"
    ];
}

export function getRankImage(rankName) {
    return `../../../assets/images/${rankName}_SUMMONER.jpg`;
}
