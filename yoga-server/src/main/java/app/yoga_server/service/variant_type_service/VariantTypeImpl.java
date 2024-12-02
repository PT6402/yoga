package app.yoga_server.service.variant_type_service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import app.yoga_server.entities.variant.VariantType;
import app.yoga_server.payload.VariantPayload;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.repository.variant.VariantRepo;
import app.yoga_server.repository.variant.VariantTypeRepo;
import app.yoga_server.service.variant_type_service.variant_service.VariantImpl;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VariantTypeImpl implements IVariantType {
  private final VariantTypeRepo variantTypeRepo;
  private final VariantImpl variantService;
  private final ProductVariantRepo productVariantRepo;
  private final VariantRepo variantRepo;

  @Override
  public ResultUtil<?> getAll() {
    try {
      var list = variantTypeRepo.findAll().stream().map((vt) -> {
        Map<String, Object> variantType = new HashMap<>();
        variantType.put("id", vt.getId());
        variantType.put("name", vt.getName());
        variantType.put("referenceProduct", vt.getProductVariants().size());
        var variants = variantService.getAllByVariantTypeId(vt.getId()).getModel().stream().map(v -> {
          Map<String, Object> variant = new HashMap<>();
          variant.put("id", v.getId());
          variant.put("value", v.getValue());
          variant.put("referenceProduct", v.getProductVariants().size());
          return variant;
        }).toArray();
        variantType.put("values", variants);
        return variantType;
      }).toArray();
      return ResultUtil.builder()
          .message("get all success")
          .status(true)
          .model(list)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> getOne(int id) {
    try {
      var result = variantTypeRepo.findById(id).orElseThrow(() -> new Exception("variant type not found by Id"));
      Map<String, Object> variantType = new HashMap<>();
      variantType.put("id", result.getId());
      variantType.put("name", result.getName());
      var variants = variantService.getAllByVariantTypeId(result.getId()).getModel().stream().map(v -> {
        Map<String, Object> variant = new HashMap<>();
        variant.put("id", v.getId());
        variant.put("value", v.getValue());
        return variant;
      })
          .toArray();
      variantType.put("values", variants);
      return ResultUtil.builder()
          .message("get one success")
          .status(true)
          .model(variantType)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> add(VariantPayload payload) {
    try {
      var checkExist = variantTypeRepo.findByName(payload.getNameVariantType());
      if (checkExist.isPresent())
        throw new Exception("name variant type already!");

      var variantTypeSaved = variantTypeRepo.save(VariantType.builder().name(payload.getNameVariantType()).build());
      variantService.add(variantTypeSaved.getId(), payload.getValueVariants());
      return ResultUtil.builder()
          .message("add success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<VariantType> update(int id, String name) {
    try {
      var result = variantTypeRepo.findById(id).orElseThrow(() -> new Exception("not found variant type by id"));
      if (result.getName().equals(name)) {
        return ResultUtil.<VariantType>builder()
            .message("name is not change")
            .status(true)
            .build();
      }
      var checkExist = variantTypeRepo.findByName(name);
      if (checkExist.isPresent())
        throw new Exception("name variant type already!");
      result.setName(name);
      variantTypeRepo.save(result);
      return ResultUtil.<VariantType>builder()
          .message("update success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.<VariantType>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<VariantType> remove(int id) {
    try {
      variantTypeRepo.findById(id).orElseThrow(() -> new Exception("not found variant type by id"));
      var checkReferenceVariant = variantRepo.findAllByVariantTypeId(id);
      if (!checkReferenceVariant.isEmpty()) {
        variantService.removeAllByVariantType(id);
      }
      var checkReferenceProduct = productVariantRepo.findByVariantTypeId(id);
      if (!checkReferenceProduct.isEmpty()) {
        throw new Exception("product exist reference variant type");
      }
      variantTypeRepo.deleteById(id);
      return ResultUtil.<VariantType>builder()
          .message("remove success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.<VariantType>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

}
