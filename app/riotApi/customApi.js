export function getRoleInfo(roleNumber,format = "png") {
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
        path + roles[roleNumber - 1] + `_icon.${format}`
    ];
}

export function getRankImage(rankName) {
    return `/images/${rankName}_SUMMONER.jpg`;
}

export function getProfileImage(id){
        var imageCode = ((id.match(/\d/g).join("") * 9301 + 49297) % 233280) / 233280;
        return Math.round(588 + imageCode * (620 - 588));
}