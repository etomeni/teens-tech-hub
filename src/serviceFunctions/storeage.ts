// 'use client';

// THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
export async function setLocalStorage(storageKey: string, value: any) {
  const encryptedvalue = btoa(escape(JSON.stringify(value)));
  if (typeof window !== "undefined" && window.localStorage) {
    return await window.localStorage.setItem(storageKey, encryptedvalue);
  }
  // return await window.localStorage.setItem(storageKey, encryptedvalue);
}

export async function getLocalStorage(storageKey:string) {
    return new Promise((resolve)=>{
      let localData;
      if (typeof window !== "undefined" && window.localStorage) {
        localData = window.localStorage.getItem(storageKey);
      }
      if (localData) {
        resolve(JSON.parse(unescape(atob(localData))));
      } else {
        resolve(false);
      }
    })
}

export async function removeLocalStorageItem(storageKey:string) {
    await localStorage.removeItem(storageKey);
    // await this._storage?.remove(storageKey);
}
  
export async function clearLocalStorage() {
      await localStorage.clear();
    // await this._storage?.clear();
}


// THE FOLLOWING FUNCTIONS ARE USED FOR SESSION STORAGE
export async function setSessionStorage(storageKey: string, value: any) {
    const encryptedvalue = btoa(escape(JSON.stringify(value)))
    return await sessionStorage.setItem(storageKey, encryptedvalue);
}

export function getSessionStorage(storageKey: string) {
    return new Promise((resolve)=>{
      const localData = sessionStorage.getItem(storageKey);
      if (localData) {
        resolve(JSON.parse(unescape(atob(localData))));
      } else {
        resolve(false);
      }
    })
}

export async function removeSessionStorageItem(storageKey:string) {
    await sessionStorage.removeItem(storageKey);
}
    
export async function clearSessionStorage() {
    await sessionStorage.clear();
}
