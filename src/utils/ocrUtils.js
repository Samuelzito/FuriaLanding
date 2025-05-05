import { db, auth } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Extrai dados de texto de um OCR processado e salva no Firestore
 * @param {string} textoOCR - Texto extraído via Tesseract.js
 */
export async function extrairDadosEDepositarNoFirebase(textoOCR) {
    const user = auth.currentUser;
    if (!user) return console.error('Usuário não autenticado.');

    const uid = user.uid;
    const docRef = doc(db, 'usuarios', uid);
    const docSnap = await getDoc(docRef);

    const usuarioExistente = docSnap.exists() ? docSnap.data() : {};

    // Regexs simples para CPF e endereço (pode ser melhorado)
    const regexCPF = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/;
    const regexEndereco = /(rua|av|avenida|travessa|alameda)[^\n,]{3,50}/i;

    const cpfExtraido = textoOCR.match(regexCPF)?.[0] || usuarioExistente.cpf || '';
    const enderecoExtraido = textoOCR.match(regexEndereco)?.[0] || usuarioExistente.endereco || '';

    await setDoc(docRef, {
        ...usuarioExistente,
        cpf: cpfExtraido,
        endereco: enderecoExtraido,
    }, { merge: true });

    console.log('Dados extraídos e salvos com sucesso no Firebase!');
}
