import Button from '@/components/ui/Button';
import { productFilters } from '@/constants';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material';
import NoSsr from '../utils/NoSsr';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IPriceFilter } from '@/types';

interface FiltersFormProps {
    onSubmit: SubmitHandler<IPriceFilter>;
    minPriceQuery: string | null;
    maxPriceQuery: string | null;
}

const FiltersForm: React.FC<FiltersFormProps> = ({
    onSubmit,
    minPriceQuery,
    maxPriceQuery,
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<IPriceFilter>({});

    useEffect(() => {
        reset({
            priceFrom:
                minPriceQuery === null ? undefined : Number(minPriceQuery),
            priceTo: maxPriceQuery === null ? undefined : Number(maxPriceQuery),
        });
    }, [reset, maxPriceQuery, minPriceQuery]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="mb-10">
                    <h4 className="text-Headline5 text-TechStopBlue mb-6">
                        Ціна
                    </h4>
                    <div className="flex items-center gap-4 text-TechStopBlue60">
                        <span>від</span>
                        <Controller
                            control={control}
                            name="priceFrom"
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                    placeholder="100"
                                    className="max-w-24"
                                />
                            )}
                        />
                        <span>до</span>
                        <Controller
                            control={control}
                            name="priceTo"
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                    placeholder="12 500"
                                    className="max-w-24"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="mb-14">
                    <h4 className="text-Headline5 text-TechStopBlue mb-6">
                        Бренд
                    </h4>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            {productFilters.length > 0 &&
                                productFilters.map((filter) => (
                                    <FormControlLabel
                                        key={filter.brandId}
                                        control={
                                            <NoSsr>
                                                <Checkbox
                                                    name={filter.brandTitle}
                                                    sx={{ color: '#02275099' }}
                                                />
                                            </NoSsr>
                                        }
                                        label={filter.brandTitle}
                                        className="text-body1 text-TechStopBlue"
                                        sx={{ marginLeft: '12px' }}
                                    />
                                ))}
                        </FormGroup>
                    </FormControl>
                </div>
                <Button
                    stylesButton="w-full md:w-[296px] bg-TechStopBlue text-TechStopWhite uppercase"
                    title="Застосувати"
                />
            </div>
        </form>
    );
};

export default FiltersForm;
