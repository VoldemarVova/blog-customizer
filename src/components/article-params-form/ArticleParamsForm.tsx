import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { UseOutsideClickCloseForm } from 'src/hooks/useOutsideClickCloseForm';

type ArticleParamsFormProps = {
	setState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setState }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [select, setSelect] = useState<ArticleStateType>(defaultArticleState);

	const arrowButtonHandler = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	UseOutsideClickCloseForm({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
	});

	const handleChange = (key: keyof ArticleStateType, selected: OptionType) => {
		setSelect((select) => ({
			...select,
			[key]: selected,
		}));
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState(defaultArticleState);
		setSelect(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState(select);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton onClick={arrowButtonHandler} open={isSidebarOpen} />
			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={select.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						name={'Размер шрифта'}
						options={fontSizeOptions}
						selected={select.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>
					<Select
						selected={select.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<Separator />
					<Select
						selected={select.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) => handleChange('backgroundColor', value)}
					/>
					<Select
						selected={select.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(value) => handleChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
