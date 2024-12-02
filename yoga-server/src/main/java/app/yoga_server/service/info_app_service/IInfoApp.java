package app.yoga_server.service.info_app_service;

import app.yoga_server.payload.BankAppPayload;
import app.yoga_server.payload.InfoAppPayload;
import app.yoga_server.utils.ResultUtil;

public interface IInfoApp {
  ResultUtil<?> getInfoApp();

  ResultUtil<?> updateInfoApp(InfoAppPayload payload);

  ResultUtil<?> updateBankApp(BankAppPayload payload);

  ResultUtil<?> addFirst(InfoAppPayload infoPayload, BankAppPayload bankPayload);
}
