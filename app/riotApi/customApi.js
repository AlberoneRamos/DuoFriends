export function getRoleInfo(roleNumber) {
    var path = "/images/";
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
    return `/images/${rankName}_SUMMONER.jpg`;
}
