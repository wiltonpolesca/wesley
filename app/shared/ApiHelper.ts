export const getHeaders = (token: string | undefined | null = null) => {
    const headers: any = {};
    
    headers["Content-Type"] = 'application/json';
    if (token){
        headers.Authorization = `Bearer ${token ?? ''}`;
        
    }
    return headers;
};