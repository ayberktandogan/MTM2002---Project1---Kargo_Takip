/*  tc kimlik numarasının geçerli olup olmadığını kontrol eder
 *  2015 Erhan BURHAN
 *--------------------------------------------------------------------*/
function tcno_dogrula(tcno)
{
    // geleni her zaman String'e çevirelim!
    tcno = String(tcno);

    // tcno '0' karakteri ile başlayamaz!
    if (tcno.substring(0, 1) === '0') {
        return false;
    }
    // Tcno 11 karakter uzunluğunda olmalı!
    if (tcno.length !== 11) {
        return false;
    }

    /**
        Aşağıdaki iki kontrol için toplamları hazır ediyoruz
        - o anki karakteri sayıya dönüştür
        - tek haneleri ayrıca topla (1,3,5,7,9)
        - çift haneleri ayrıca topla (2,4,6,8)
        - bütün haneleri ayrıca topla
    **/
    var ilkon_array = tcno.substr(0, 10).split('');
    var ilkon_total = hane_tek = hane_cift = 0;

    for (var i = j = 0; i < 9; ++i) {
      j = parseInt(ilkon_array[i], 10);
      if (i & 1) { // tek ise, tcnin çift haneleri toplanmalı!
          hane_cift  += j;
      } else {
          hane_tek += j;
      }
      ilkon_total += j;
    }

    /**
        KONTROL 1:
        1. 3. 5. 7. ve 9. hanelerin toplamının 7 katından, 
        2. 4. 6. ve 8. hanelerin toplamı çıkartıldığında, 
        elde edilen sonucun Mod10'u bize 10. haneyi verir
    **/
    if ( (hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
        return false;
    }

    /**
        KONTROL 2:
        1. 2. 3. 4. 5. 6. 7. 8. 9. ve 10. hanelerin toplamından
        elde edilen sonucun Mod10'u bize 11. haneyi vermelidir.
        NOT: ilk 9 haneyi üstteki FOR döndüsünde zaten topladık!
    **/
    ilkon_total += parseInt(ilkon_array[9], 10); 
    if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
        return false;
    }

    return true;
}

module.exports = tcno_dogrula