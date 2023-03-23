export const formatDate = (dateString:string):string => {
    return new Date(dateString).toLocaleString("en-EU", 
    {
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    })
}