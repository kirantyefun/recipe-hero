def filter_qs_helper(request, qs, fields):
    """
    Helper function to filter a queryset based on the given fields.

    Args:
        request (HttpRequest): The request object containing the query parameters.
        qs (QuerySet): The queryset to be filtered.
        fields (Tuple[str, str]]): A list of tuples containing the query parameter name and the corresponding model field.

    Returns:
        QuerySet: The filtered queryset.
    """
    for param, field in fields:
        val = request.query_params.get(param)
        if param == "recipient":
            val = request.GET.getlist(param, [])
        if val:
            print('value found')
            print(f'param: {param} :: value:; {val} :: field:: {field}')
            qs = qs.filter(**{field: val})
    qs = qs.all()
    return qs
