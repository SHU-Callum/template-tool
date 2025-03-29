package uk.uni.callum.templateTool.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class Encryption {
    @Value("${encryptionKey}")
    private String encryptKey;

    // Pad encryption key to compatible AES key size
    private String padKey(String key) {
        int length = key.length();
        if (length < 16) {
            return String.format("%-16s", key).replace(' ', '0');
        } else if (length < 24) {
            return String.format("%-24s", key).replace(' ', '0');
        } else if (length < 32) {
            return String.format("%-32s", key).replace(' ', '0');
        } else {
            return key.substring(0, 32);
        }
    }

    // Decrypts using IV and encrypted data
    public String decrypt(String encryptedData, String iv) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {
        SecretKeySpec keySpec = new SecretKeySpec(padKey(encryptKey).getBytes(), "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(Base64.getDecoder().decode(iv));
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
        byte[] decodedValue = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedValue = cipher.doFinal(decodedValue);
        return new String(decryptedValue);
    }
}