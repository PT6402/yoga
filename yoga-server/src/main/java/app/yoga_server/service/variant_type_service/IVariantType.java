package app.yoga_server.service.variant_type_service;

import app.yoga_server.payload.VariantPayload;
import app.yoga_server.utils.ResultUtil;

public interface IVariantType {
  ResultUtil<?> getAll();

  ResultUtil<?> getOne(int id);

  ResultUtil<?> add(VariantPayload payload);

  ResultUtil<?> update(int id, String name);

  ResultUtil<?> remove(int id);
}
