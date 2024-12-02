package app.yoga_server.service.info_app_service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import app.yoga_server.entities.InfoApp;
import app.yoga_server.payload.BankAppPayload;
import app.yoga_server.payload.InfoAppPayload;
import app.yoga_server.repository.InfoAppRepo;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InfoAppImpl implements IInfoApp {
  private final InfoAppRepo infoAppRepo;
  @Value("${upload.pathInfoApp}")
  private String fileUpload;

  @Override
  public ResultUtil<?> getInfoApp() {
    try {
      var data = infoAppRepo.findFirst().orElseThrow(() -> new Exception("not found"));
      return ResultUtil.builder().message("get success").model(data).status(true).build();
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }

  @Override
  public ResultUtil<?> updateInfoApp(InfoAppPayload payload) {
    try {
      var data = infoAppRepo.findFirst().orElseThrow(() -> new Exception("not found"));
      if (payload.getLogoApp() != null) {
        Path oldFilePath = Paths.get(fileUpload + "/" + data.getLogoApp());
        try {
          Files.deleteIfExists(oldFilePath);
        } catch (IOException e) {
          e.printStackTrace();
        }
        String fileName = System.currentTimeMillis() + "_" + payload.getLogoApp().getOriginalFilename();
        FileCopyUtils.copy(payload.getLogoApp().getBytes(), new File(fileUpload + "/" + fileName.replace(" ", "_")));
        data.setLogoApp(fileName.replace(" ",
            "_"));
      }
      data.setAddress(payload.getAddress());
      data.setEmail(payload.getEmail());
      data.setLinkFanPage(payload.getLinkFanPage());
      data.setPhone(payload.getPhone());
      data.setSloganApp(payload.getSloganApp());
      infoAppRepo.save(data);
      return ResultUtil.builder().message("update success").status(true).build();
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }

  @Override
  public ResultUtil<?> updateBankApp(BankAppPayload payload) {
    try {
      var data = infoAppRepo.findFirst().orElseThrow(() -> new Exception("not found"));
      if (payload.getBankQRCode() != null) {
        Path oldFilePath = Paths.get(fileUpload + "/" + data.getBankQRCode());
        try {
          Files.deleteIfExists(oldFilePath);
        } catch (IOException e) {
          e.printStackTrace();
        }
        String fileName = System.currentTimeMillis() + "_" + payload.getBankQRCode().getOriginalFilename();
        FileCopyUtils.copy(payload.getBankQRCode().getBytes(), new File(fileUpload + "/" + fileName.replace(" ", "_")));
        data.setBankQRCode(fileName.replace(" ",
            "_"));
      }
      data.setBankName(payload.getBankName());
      data.setBankOwnerName(payload.getBankOwnerName());
      data.setBankStk(payload.getBankStk());
      infoAppRepo.save(data);
      return ResultUtil.builder().message("update success").status(true).build();
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }

  @Override
  public ResultUtil<?> addFirst(InfoAppPayload infoPayload, BankAppPayload bankPayload) {
    try {
      var checkSize = infoAppRepo.findAll();
      if (checkSize.size() > 0) {
        return ResultUtil.builder().message("add first success").status(true).build();
      } else {
        infoAppRepo.save(InfoApp.builder()
            .address(infoPayload.getAddress())
            .email(infoPayload.getEmail())
            .phone(infoPayload.getPhone())
            .linkFanPage(infoPayload.getLinkFanPage())
            .sloganApp(infoPayload.getSloganApp())

            // bank
            .bankName(bankPayload.getBankName())
            .bankOwnerName(bankPayload.getBankOwnerName())
            .bankStk(bankPayload.getBankStk())
            .build());
        return ResultUtil.builder().message("add first success").status(true).build();
      }
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }
}
