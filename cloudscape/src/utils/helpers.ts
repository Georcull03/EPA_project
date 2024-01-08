export function ApiPath() {

    const apiDomain = 'api.cullenge.people.aws.dev'

    const domainCDN = 'prodqwiz.cullenge.people.aws.dev'

    console.log(domainCDN)

    const hasPrefix = domainCDN.includes("prod" || "beta")

    if (hasPrefix) {
        const usePrefix = window.location.host.toLowerCase().split('.')[0]
        console.log('this is the prefix created: ' + usePrefix)
        return usePrefix + apiDomain
    }
    else { return apiDomain }
}

export function createApiPath() {

    const apiUrl = 'https://' + ApiPath()

    console.log('this is the url created: ' + apiUrl)

    return apiUrl
}