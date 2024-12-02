package app.yoga_server.service.variant_type_service.variant_service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import app.yoga_server.entities.variant.Variant;
import app.yoga_server.entities.variant.VariantType;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.repository.variant.VariantRepo;
import app.yoga_server.repository.variant.VariantTypeRepo;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VariantImpl implements IVariant {
  private final VariantRepo variantRepo;
  private final VariantTypeRepo variantTypeRepo;
  private final ProductVariantRepo productVariantRepo;

  @Override
  public ResultUtil<List<Variant>> getAll() {
    try {
      var list = variantRepo.findAll();
      return ResultUtil.<List<Variant>>builder()
          .message("get all success")
          .status(true)
          .model(list)
          .build();
    } catch (Exception e) {
      return ResultUtil.<List<Variant>>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<List<Variant>> getAllByVariantTypeId(int variantTypeId) {
    try {
      var list = variantRepo.findAllByVariantTypeId(variantTypeId);
      return ResultUtil.<List<Variant>>builder()
          .message("get all success")
          .status(true)
          .model(list)
          .build();
    } catch (Exception e) {
      return ResultUtil.<List<Variant>>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Variant> getOne(int id) {
    try {
      var result = variantRepo.findById(id).orElseThrow(() -> new Exception("variant not found by id"));
      return ResultUtil.<Variant>builder()
          .message("get one success")
          .status(true)
          .model(result)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Variant>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Variant> add(int variantTypeId, String valueVariant) {
    try {
      var variantType = variantTypeRepo.findById(variantTypeId)
          .orElseThrow(() -> new Exception("variant type id not found"));

      var checkExist = variantRepo.findByValue(valueVariant, variantTypeId);
      if (checkExist.isPresent())
        throw new Exception("value variant already");

      var variantSaved = variantRepo.save(Variant.builder().variantType(variantType).value(valueVariant).build());
      return ResultUtil.<Variant>builder()
          .message("add success")
          .status(true)
          .model(variantSaved)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Variant>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Variant> add(int variantTypeId, String[] valueVariants) {
    try {
      var variantType = variantTypeRepo.findById(variantTypeId)
          .orElseThrow(() -> new Exception("variant type id not found"));
      List<Variant> listSave = new ArrayList<>();
      for (int i = 0; i < valueVariants.length; i++) {
        listSave.add(Variant.builder().variantType(variantType).value(valueVariants[i]).build());
      }
      variantRepo.saveAll(listSave);
      return ResultUtil.<Variant>builder()
          .message("add  success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Variant>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Variant> updateValueVariant(int id, String valueVariant) {
    try {
      var variant = variantRepo.findById(id).orElseThrow(() -> new Exception("variant not found by id"));
      var checkExist = variantRepo.findByValue(valueVariant, variant.getVariantType().getId());
      if (checkExist.isPresent() && !variant.getValue().equals(valueVariant))
        throw new Exception("value variant already");
      if (variant.getValue().equals(valueVariant)) {
        return ResultUtil.<Variant>builder()
            .message("value not change")
            .status(true)
            .build();
      }
      variant.setValue(valueVariant);
      var variantSaved = variantRepo.save(variant);
      return ResultUtil.<Variant>builder()
          .message("update success")
          .status(true)
          .model(variantSaved)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Variant>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Variant> remove(int id) {
    try {
      var variant = variantRepo.findById(id).orElseThrow(() -> new Exception("variant not found by id"));
      var checkReferenceProduct = productVariantRepo.findByVariantId(id);
      if (!checkReferenceProduct.isEmpty()) {
        throw new Exception("product exist reference variant");
      }
      variantRepo.deleteById(id);
      return ResultUtil.<Variant>builder()
          .message("remove success")
          .status(true)
          .model(variant)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Variant>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public boolean removeAllByVariantType(int variantTypeId) {
    try {
      variantTypeRepo.findById(variantTypeId).orElseThrow(() -> new Exception("not found variant type by id"));
      variantRepo.removeAllByVariantType(variantTypeId);
      return true;

    } catch (Exception e) {
      return false;
    }
  }

}
